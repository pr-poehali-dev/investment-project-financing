"""
API для управления проектами контрактного финансирования.
Поддерживает получение списка, создание, обновление и удаление проектов.
"""
import json
import os
import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
}

ADMIN_KEY = os.environ.get('ADMIN_SECRET_KEY', 'changeme')
SCHEMA = 't_p18166291_investment_project_f'


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def ok(data, status=200):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False, default=str),
    }


def err(msg, status=400):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps({'error': msg}, ensure_ascii=False),
    }


def check_admin(headers):
    key = headers.get('x-admin-key') or headers.get('X-Admin-Key', '')
    return key == ADMIN_KEY


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    headers = event.get('headers') or {}
    body_raw = event.get('body') or '{}'
    body = json.loads(body_raw) if body_raw else {}

    conn = get_conn()
    cur = conn.cursor()

    # GET /  — список проектов
    if method == 'GET':
        only_active = params.get('all') != '1'
        where = f"WHERE is_active = TRUE" if only_active else ""
        cur.execute(f"""
            SELECT id, name, client, category, amount, yield_pct,
                   term_months, progress, status, description, is_active, created_at
            FROM {SCHEMA}.projects
            {where}
            ORDER BY id DESC
        """)
        cols = [d[0] for d in cur.description]
        rows = [dict(zip(cols, row)) for row in cur.fetchall()]
        conn.close()
        return ok(rows)

    # Все остальные методы требуют ключа
    if not check_admin(headers):
        return err('Доступ запрещён', 403)

    # POST / — создать проект
    if method == 'POST':
        required = ['name', 'client', 'category', 'amount', 'yield_pct', 'term_months']
        for f in required:
            if f not in body:
                return err(f'Поле {f} обязательно')

        cur.execute(f"""
            INSERT INTO {SCHEMA}.projects
                (name, client, category, amount, yield_pct, term_months, progress, status, description, is_active)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            body['name'], body['client'], body['category'],
            int(body['amount']), float(body['yield_pct']), int(body['term_months']),
            int(body.get('progress', 0)), body.get('status', 'Новый'),
            body.get('description', ''), bool(body.get('is_active', True))
        ))
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return ok({'id': new_id, 'message': 'Проект создан'}, 201)

    # PUT /?id=X — обновить проект
    if method == 'PUT':
        project_id = params.get('id')
        if not project_id:
            return err('Укажите id проекта')
        fields = []
        values = []
        allowed = ['name', 'client', 'category', 'amount', 'yield_pct',
                   'term_months', 'progress', 'status', 'description', 'is_active']
        for k in allowed:
            if k in body:
                fields.append(f"{k} = %s")
                values.append(body[k])
        if not fields:
            return err('Нет полей для обновления')
        values.append(project_id)
        cur.execute(f"""
            UPDATE {SCHEMA}.projects
            SET {', '.join(fields)}, updated_at = NOW()
            WHERE id = %s
        """, values)
        conn.commit()
        conn.close()
        return ok({'message': 'Проект обновлён'})

    # DELETE /?id=X — удалить проект
    if method == 'DELETE':
        project_id = params.get('id')
        if not project_id:
            return err('Укажите id проекта')
        cur.execute(f"DELETE FROM {SCHEMA}.projects WHERE id = %s", (project_id,))
        conn.commit()
        conn.close()
        return ok({'message': 'Проект удалён'})

    return err('Метод не поддерживается', 405)
