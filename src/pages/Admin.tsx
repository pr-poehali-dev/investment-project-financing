import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/940ade06-db06-4bd7-b2b8-fcc18e948946";

interface Project {
  id: number;
  name: string;
  client: string;
  category: "Оборудование" | "СМР";
  amount: number;
  yield_pct: number;
  term_months: number;
  progress: number;
  status: "Новый" | "Активный" | "Завершается" | "Завершён";
  description: string;
  is_active: boolean;
}

const EMPTY: Omit<Project, "id"> = {
  name: "",
  client: "",
  category: "Оборудование",
  amount: 0,
  yield_pct: 25,
  term_months: 4,
  progress: 0,
  status: "Новый",
  description: "",
  is_active: true,
};

const STATUS_COLORS: Record<string, string> = {
  "Новый": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  "Активный": "text-gold bg-[hsl(var(--gold)/0.1)] border-[hsl(var(--gold)/0.3)]",
  "Завершается": "text-green-400 bg-green-400/10 border-green-400/30",
  "Завершён": "text-muted-foreground bg-muted border-border",
};

function formatAmount(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)} млн ₽`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)} тыс. ₽`;
  return `${n} ₽`;
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = async (key: string) => {
    setLoading(true);
    const res = await fetch(`${API_URL}?all=1`, {
      headers: { "X-Admin-Key": key },
    });
    const data = await res.json();
    setLoading(false);
    return data;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!adminKey.trim()) { setAuthError("Введите ключ"); return; }
    setLoading(true);
    const res = await fetch(`${API_URL}?all=1`, {
      headers: { "X-Admin-Key": adminKey },
    });
    setLoading(false);
    if (res.status === 403) { setAuthError("Неверный ключ доступа"); return; }
    const data = await res.json();
    setProjects(data);
    setAuthed(true);
  };

  const openCreate = () => {
    setForm(EMPTY);
    setEditProject(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditProject(p);
    setForm({
      name: p.name, client: p.client, category: p.category,
      amount: p.amount, yield_pct: p.yield_pct, term_months: p.term_months,
      progress: p.progress, status: p.status, description: p.description || "",
      is_active: p.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = !!editProject;
    const url = isEdit ? `${API_URL}?id=${editProject!.id}` : API_URL;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
      body: JSON.stringify({ ...form, amount: Number(form.amount), yield_pct: Number(form.yield_pct), term_months: Number(form.term_months), progress: Number(form.progress) }),
    });
    setSaving(false);
    if (res.ok) {
      showToast(isEdit ? "Проект обновлён" : "Проект создан");
      setShowForm(false);
      const data = await fetchProjects(adminKey);
      setProjects(data);
    } else {
      const d = await res.json();
      showToast(d.error || "Ошибка", "err");
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`${API_URL}?id=${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Key": adminKey },
    });
    setDeleteConfirm(null);
    if (res.ok) {
      showToast("Проект удалён");
      const data = await fetchProjects(adminKey);
      setProjects(data);
    } else {
      showToast("Ошибка удаления", "err");
    }
  };

  const toggleActive = async (p: Project) => {
    await fetch(`${API_URL}?id=${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    const data = await fetchProjects(adminKey);
    setProjects(data);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-8 h-8 bg-gold flex items-center justify-center">
              <span className="text-[11px] font-bold text-[hsl(var(--navy))] font-body">КИ</span>
            </div>
            <span className="font-display text-xl font-semibold">КонтрактИнвест</span>
          </div>
          <div className="bg-card border border-border p-8">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="Lock" size={16} className="text-gold" />
              <h1 className="font-display text-2xl font-semibold">Вход в панель</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Ключ доступа
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Введите ключ..."
                  className="w-full bg-background border border-border px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-all"
                />
                {authError && (
                  <p className="text-xs text-red-400 font-body mt-2">{authError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3 disabled:opacity-50"
              >
                {loading ? "Проверка..." : "Войти"}
              </button>
            </form>
          </div>
          <p className="text-center mt-4 text-xs text-muted-foreground font-body">
            <a href="/" className="hover:text-gold transition-colors">← На главную</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 text-sm font-body font-semibold border ${toast.type === "ok" ? "bg-green-900/80 border-green-500/40 text-green-300" : "bg-red-900/80 border-red-500/40 text-red-300"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
              <Icon name="ChevronLeft" size={16} />
              <span className="text-xs font-body uppercase tracking-wider">Сайт</span>
            </a>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Icon name="Settings" size={16} className="text-gold" />
              <span className="font-display text-lg font-semibold">Управление проектами</span>
            </div>
          </div>
          <button onClick={openCreate} className="btn-gold flex items-center gap-2 text-sm">
            <Icon name="Plus" size={15} />
            Новый проект
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего проектов", val: projects.length, icon: "Folder" },
            { label: "Активных", val: projects.filter(p => p.is_active).length, icon: "Eye" },
            { label: "Скрытых", val: projects.filter(p => !p.is_active).length, icon: "EyeOff" },
            { label: "Завершено", val: projects.filter(p => p.status === "Завершён").length, icon: "CheckCircle" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border p-4 flex items-center gap-3">
              <Icon name={s.icon as string} size={18} className="text-gold" />
              <div>
                <div className="font-display text-2xl font-bold text-gold">{s.val}</div>
                <div className="text-xs text-muted-foreground font-body">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground font-body">Загрузка...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border">
            <Icon name="FolderOpen" size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-body">Нет проектов. Создайте первый!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id} className={`bg-card border p-5 transition-all ${p.is_active ? "border-border" : "border-border opacity-50"}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-body font-semibold uppercase tracking-widest px-2 py-0.5 border rounded-sm ${STATUS_COLORS[p.status]}`}>
                        {p.status}
                      </span>
                      <span className="text-[10px] font-body text-muted-foreground uppercase tracking-widest px-2 py-0.5 border border-border">
                        {p.category}
                      </span>
                      {!p.is_active && (
                        <span className="text-[10px] font-body text-muted-foreground uppercase tracking-widest px-2 py-0.5 border border-dashed border-border">
                          Скрыт
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold truncate">{p.name}</h3>
                    <p className="text-sm text-muted-foreground font-body">{p.client}</p>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-6 text-sm font-body flex-shrink-0">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Объём</div>
                      <div className="font-semibold">{formatAmount(p.amount)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Доходность</div>
                      <div className="font-display text-lg font-bold text-gold">{p.yield_pct}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Срок</div>
                      <div className="font-semibold">{p.term_months} мес.</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Прогресс</div>
                      <div className="font-semibold">{p.progress}%</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleActive(p)}
                      title={p.is_active ? "Скрыть с сайта" : "Показать на сайте"}
                      className="p-2 border border-border hover:border-gold hover:text-gold text-muted-foreground transition-all"
                    >
                      <Icon name={p.is_active ? "Eye" : "EyeOff"} size={15} />
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      className="p-2 border border-border hover:border-gold hover:text-gold text-muted-foreground transition-all"
                    >
                      <Icon name="Pencil" size={15} />
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-2 text-xs font-body font-semibold bg-red-600 hover:bg-red-700 text-white transition-all"
                        >
                          Удалить
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-2 text-xs font-body border border-border hover:border-gold text-muted-foreground transition-all"
                        >
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="p-2 border border-border hover:border-red-500 hover:text-red-400 text-muted-foreground transition-all"
                      >
                        <Icon name="Trash2" size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                {editProject ? "Редактировать проект" : "Новый проект"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-gold transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="field-label">Название проекта *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Поставка оборудования..."
                    className="field-input"
                  />
                </div>

                <div>
                  <label className="field-label">Заказчик *</label>
                  <input
                    required
                    value={form.client}
                    onChange={e => setForm({ ...form, client: e.target.value })}
                    placeholder="ООО «Компания»"
                    className="field-input"
                  />
                </div>

                <div>
                  <label className="field-label">Категория *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value as "Оборудование" | "СМР" })}
                    className="field-input"
                  >
                    <option>Оборудование</option>
                    <option>СМР</option>
                  </select>
                </div>

                <div>
                  <label className="field-label">Объём контракта (₽) *</label>
                  <input
                    required
                    type="number"
                    min={0}
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                    placeholder="48500000"
                    className="field-input"
                  />
                </div>

                <div>
                  <label className="field-label">Доходность (% годовых) *</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={100}
                    step={0.01}
                    value={form.yield_pct}
                    onChange={e => setForm({ ...form, yield_pct: Number(e.target.value) })}
                    className="field-input"
                  />
                </div>

                <div>
                  <label className="field-label">Срок (месяцев) *</label>
                  <input
                    required
                    type="number"
                    min={1}
                    value={form.term_months}
                    onChange={e => setForm({ ...form, term_months: Number(e.target.value) })}
                    className="field-input"
                  />
                </div>

                <div>
                  <label className="field-label">Прогресс исполнения (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.progress}
                    onChange={e => setForm({ ...form, progress: Number(e.target.value) })}
                    className="field-input"
                  />
                </div>

                <div>
                  <label className="field-label">Статус</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value as "Новый" | "Активный" | "Завершается" | "Завершён" })}
                    className="field-input"
                  >
                    <option>Новый</option>
                    <option>Активный</option>
                    <option>Завершается</option>
                    <option>Завершён</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="field-label">Описание</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Краткое описание проекта..."
                    className="field-input resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setForm({ ...form, is_active: !form.is_active })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${form.is_active ? "bg-gold" : "bg-border"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                    <span className="text-sm font-body font-semibold">
                      {form.is_active ? "Показывать на сайте" : "Скрыт с сайта"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-gold flex-1 py-3 disabled:opacity-50">
                  {saving ? "Сохраняю..." : editProject ? "Сохранить изменения" : "Создать проект"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline-gold px-6 py-3">
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}