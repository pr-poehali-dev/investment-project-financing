CREATE TABLE t_p18166291_investment_project_f.projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Оборудование', 'СМР')),
    amount BIGINT NOT NULL,
    yield_pct NUMERIC(5,2) NOT NULL,
    term_months INTEGER NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status TEXT NOT NULL DEFAULT 'Новый' CHECK (status IN ('Новый', 'Активный', 'Завершается', 'Завершён')),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO t_p18166291_investment_project_f.projects
    (name, client, category, amount, yield_pct, term_months, progress, status)
VALUES
    ('Поставка медицинского оборудования', 'Министерство здравоохранения', 'Оборудование', 48500000, 28.00, 5, 65, 'Активный'),
    ('Монтаж инженерных систем ТЦ', 'ГК «Девелопмент-Юг»', 'СМР', 73200000, 31.00, 6, 40, 'Активный'),
    ('Закуп строительной техники', 'ООО «ДорСтрой»', 'Оборудование', 29100000, 26.00, 4, 85, 'Завершается'),
    ('Электромонтажные работы АЭС', 'Росатом', 'СМР', 142000000, 34.00, 8, 20, 'Новый');
