import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/6c5f0413-1283-4f01-907d-771ff3b2886d/files/e18b860e-30ff-4877-a02e-414bbb761243.jpg";
const CONSTRUCTION_IMAGE = "https://cdn.poehali.dev/projects/6c5f0413-1283-4f01-907d-771ff3b2886d/files/868e0c41-3e50-48fc-a101-2426ca3ae652.jpg";
const API_URL = "https://functions.poehali.dev/940ade06-db06-4bd7-b2b8-fcc18e948946";

interface Project {
  id: number;
  name: string;
  client: string;
  category: string;
  amount: number;
  yield_pct: number;
  term_months: number;
  progress: number;
  status: string;
}

const faqs = [
  {
    q: "Кто участвует в сделке?",
    a: "Участников двое: инвестор (или партнёр) и подрядчик, у которого есть контракт. Мы выступаем организатором — находим стороны, структурируем сделку и сопровождаем весь процесс. Деньги всегда движутся напрямую между участниками.",
  },
  {
    q: "Что такое контрактное финансирование?",
    a: "Подрядчик выиграл тендер, но для закупки оборудования или старта работ нужны оборотные средства. Инвестор или партнёр предоставляет финансирование напрямую подрядчику — через договор займа, поставки или агентскую схему. По исполнении контракта происходит расчёт.",
  },
  {
    q: "Какова роль ООО «Стайл»?",
    a: "Мы — организатор сделок. Не принимаем деньги в управление, не формируем общий фонд, не осуществляем лицензируемую деятельность. Наша задача — свести стороны, структурировать договор и сопроводить сделку от начала до расчёта.",
  },
  {
    q: "Как определяются финансовые условия?",
    a: "Финансовые условия и возможная доходность определяются параметрами конкретного проекта и согласовываются сторонами индивидуально — после предварительного отбора и обсуждения.",
  },
  {
    q: "Кому это подходит?",
    a: "Бизнесу, которому нужен оборотный капитал для исполнения контрактов или банковские гарантии. Инвесторам и партнёрам, готовым к участию в реальных проектах со структурированной экономикой.",
  },
  {
    q: "Как начать работу?",
    a: "Оставьте заявку через форму или напишите в Telegram / WhatsApp. Мы проведём предварительное обсуждение, расскажем о текущих проектах и согласуем условия участия.",
  },
];

export default function Index() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(28);
  const [months, setMonths] = useState(6);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => { setProjects(data); setProjectsLoading(false); })
      .catch(() => setProjectsLoading(false));
  }, []);

  const profit = Math.round((amount * (rate / 100) * (months / 12)));
  const total = amount + profit;

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) =>
          activeTab === "equipment"
            ? p.category === "Оборудование"
            : p.category === "СМР"
        );

  const formatMln = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)} млн ₽`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)} тыс. ₽`;
    return `${n} ₽`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gold flex items-center justify-center">
              <span className="text-[10px] font-bold text-[hsl(var(--navy))] font-body">КИ</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-wide text-foreground">
              КонтрактИнвест
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {[
              ["О нас", "#about"],
              ["Как работаем", "#how"],
              ["Кому подходит", "#who"],
              ["Проекты", "#projects"],
              ["Калькулятор", "#calc"],
              ["Аналитика", "#analytics"],
              ["FAQ", "#faq"],
              ["Контакты", "#contacts"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
          <a href="#contacts" className="btn-gold hidden md:block">
            Обсудить проект
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--navy))] via-[hsl(220_30%_6%/0.85)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))] via-transparent to-transparent" />

        <div className="relative container max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="tag mb-6 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              Организатор сделок
            </div>
            <h1
              className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6 animate-fade-in-up opacity-0 delay-100"
              style={{ animationFillMode: 'forwards' }}
            >
              Контрактное<br />
              финансирование и{" "}
              <span className="text-gold italic">сопровождение</span>
              <br />
              сделок
            </h1>
            <p
              className="text-lg text-muted-foreground font-body font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up opacity-0 delay-200"
              style={{ animationFillMode: 'forwards' }}
            >
              Организуем финансирование исполнения контрактов и соединяем инвесторов с подрядчиками в реальном секторе.
            </p>
            <p
              className="text-base text-muted-foreground font-body font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up opacity-0 delay-200"
              style={{ animationFillMode: 'forwards' }}
            >
              Работаем с реальными проектами в строительстве, энергетике и инфраструктуре.
            </p>
            <div
              className="flex flex-wrap gap-4 mb-16 animate-fade-in-up opacity-0 delay-300"
              style={{ animationFillMode: 'forwards' }}
            >
              <a href="#contacts" className="btn-gold">Обсудить проект</a>
              <a href="#how" className="btn-outline-gold">Как это работает</a>
            </div>

            <div
              className="grid grid-cols-3 gap-8 animate-fade-in-up opacity-0 delay-400"
              style={{ animationFillMode: 'forwards' }}
            >
              {[
                { num: "Реальный", label: "Сектор экономики" },
                { num: "Прямые", label: "Сделки между сторонами" },
                { num: "Полное", label: "Сопровождение" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat-num mb-1">{s.num}</div>
                  <div className="text-xs text-muted-foreground font-body uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-gold opacity-60" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-6">О компании</div>
              <h2 className="section-title mb-6">
                ООО «Стайл» —<br />
                <span className="text-gold italic">организатор</span> сделок
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Мы организуем финансирование исполнения контрактов и сопровождаем сделки между инвесторами и подрядчиками.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Опыт в инвестициях и контрактном финансировании. Работаем с инфраструктурными проектами, участвуем в сопровождении сделок с многомиллионными контрактами.
              </p>
              <div className="border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--gold)/0.05)] p-5 mb-8">
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  <span className="text-gold font-semibold">Важно:</span> Мы не принимаем денежные средства в управление и не осуществляем деятельность, требующую лицензирования. Все сделки заключаются напрямую между участниками (инвестор — подрядчик) на основании договоров.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Handshake", label: "Организатор сделок", desc: "Структурируем и сопровождаем" },
                  { icon: "FileText", label: "Прозрачные договоры", desc: "Напрямую между сторонами" },
                  { icon: "TrendingUp", label: "Реальный сектор", desc: "Строительство, энергетика" },
                  { icon: "Users", label: "Индивидуальный подход", desc: "Условия под каждый проект" },
                ].map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)]">
                      <Icon name={f.icon as string} size={16} className="text-gold" fallback="Star" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold font-body mb-0.5">{f.label}</div>
                      <div className="text-xs text-muted-foreground font-body">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/6c5f0413-1283-4f01-907d-771ff3b2886d/bucket/93271db9-ca8b-43d0-9add-b3b8602b0d80.jpg"
                alt="Строительство"
                className="w-full h-96 object-cover object-top"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-6 w-56">
                <div className="text-3xl font-display font-bold text-gold mb-1">65 млн ₽</div>
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest">
                  Пример контракта<br />в сопровождении
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="tag mb-5">Схема работы</div>
            <h2 className="section-title mb-4">
              Как это{" "}
              <span className="text-gold italic">работает</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Деньги движутся напрямую между участниками — мы организуем и сопровождаем
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-20">
            {[
              { step: "01", icon: "FileCheck", title: "Есть контракт", desc: "Подрядчик выиграл тендер и обращается к нам за организацией финансирования" },
              { step: "02", icon: "Search", title: "Подбор партнёра", desc: "Подбираем инвестора или партнёра под параметры конкретного проекта" },
              { step: "03", icon: "FileSignature", title: "Договор", desc: "Стороны заключают договор напрямую: займ, поставка или агентская схема" },
              { step: "04", icon: "HardHat", title: "Исполнение", desc: "Проект исполняется. Мы координируем взаимодействие сторон на всех этапах" },
              { step: "05", icon: "Banknote", title: "Расчёт", desc: "По завершении контракта происходит расчёт между сторонами сделки" },
            ].map((s) => (
              <div key={s.step} className="card-invest p-6 relative">
                <div className="absolute top-4 right-4 font-display text-4xl font-bold text-[hsl(var(--gold)/0.08)]">
                  {s.step}
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)] mb-4">
                  <Icon name={s.icon as string} size={18} className="text-gold" fallback="Star" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Кейс */}
          <div className="border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--gold)/0.04)] p-8">
            <div className="tag mb-4">Пример сделки</div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">Контракт</div>
                <div className="font-display text-4xl font-bold text-gold mb-1">50 млн ₽</div>
                <div className="text-sm text-muted-foreground font-body">Инфраструктурный объект</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">Финансирование</div>
                <div className="font-display text-4xl font-bold mb-1">10 млн ₽</div>
                <div className="text-sm text-muted-foreground font-body">Прямой договор сторон</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">Срок</div>
                <div className="font-display text-4xl font-bold mb-1">4 мес.</div>
                <div className="text-sm text-muted-foreground font-body">От старта до расчёта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* WHO IT'S FOR */}
      <section id="who" className="py-24 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="tag mb-5">Аудитория</div>
            <h2 className="section-title">
              Кому это{" "}
              <span className="text-gold italic">подходит</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card-invest p-8">
              <div className="w-12 h-12 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)] mb-6">
                <Icon name="Building2" size={22} className="text-gold" fallback="Star" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">Бизнесу</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">Подрядчикам и компаниям с контрактами</p>
              <div className="space-y-3">
                {[
                  "Нужен оборотный капитал для исполнения контракта",
                  "Требуется финансирование закупки оборудования",
                  "Нужны банковские гарантии",
                  "Ищете партнёра по совместному исполнению",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Icon name="Check" size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-body text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-invest p-8 border-gold ring-1 ring-[hsl(var(--gold)/0.3)]">
              <div className="w-12 h-12 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)] mb-6">
                <Icon name="TrendingUp" size={22} className="text-gold" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">Инвесторам</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">Частным инвесторам и партнёрам</p>
              <div className="space-y-3">
                {[
                  "Участие в реальных проектах реального сектора",
                  "Сделки с понятной и прозрачной экономикой",
                  "Индивидуальные условия под каждую сделку",
                  "Участие после предварительного отбора",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Icon name="Check" size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-body text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Преимущества */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "FileCheck", title: "Реальные контракты", desc: "Работаем только с действующими государственными и корпоративными контрактами" },
              { icon: "Eye", title: "Прозрачная структура", desc: "Все условия согласовываются индивидуально и фиксируются в договоре" },
              { icon: "Settings", title: "Индивидуальные условия", desc: "Параметры каждой сделки определяются под конкретный проект и стороны" },
              { icon: "Shield", title: "Сопровождение", desc: "Координируем взаимодействие сторон на всех этапах исполнения" },
            ].map((f) => (
              <div key={f.title} className="card-invest p-6">
                <div className="w-10 h-10 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)] mb-4">
                  <Icon name={f.icon as string} size={18} className="text-gold" fallback="Star" />
                </div>
                <h3 className="font-body font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="tag mb-4">Текущие проекты</div>
              <h2 className="section-title">
                Открытые{" "}
                <span className="text-gold italic">позиции</span>
              </h2>
            </div>
            <div className="flex gap-2">
              {[
                { key: "all", label: "Все" },
                { key: "equipment", label: "Оборудование" },
                { key: "smr", label: "СМР" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-4 py-2 text-xs font-body font-semibold uppercase tracking-wider transition-all ${
                    activeTab === t.key
                      ? "bg-gold text-[hsl(var(--navy))]"
                      : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="card-invest p-6 animate-pulse">
                  <div className="h-4 bg-border rounded mb-3 w-2/3" />
                  <div className="h-6 bg-border rounded mb-2 w-full" />
                  <div className="h-4 bg-border rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground font-body border border-dashed border-border">
              Проекты не найдены
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((p) => (
                <div key={p.id} className="card-invest p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="tag">{p.category}</span>
                        <span
                          className={`tag ${
                            p.status === "Завершается"
                              ? "bg-green-500/10 border-green-500/30 text-green-400"
                              : p.status === "Новый"
                              ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                              : ""
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-1">{p.name}</h3>
                      <p className="text-sm text-muted-foreground font-body">{p.client}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div>
                      <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Объём</div>
                      <div className="font-body font-semibold text-sm">{formatMln(p.amount)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Доходность</div>
                      <div className="font-display text-lg font-bold text-gold">{p.yield_pct}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Срок</div>
                      <div className="font-body font-semibold text-sm">{p.term_months} мес.</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground font-body mb-2">
                      <span>Исполнение</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    {p.description && (
                      <div className="text-xs text-muted-foreground font-body mt-2">{p.description}</div>
                    )}
                  </div>

                  <a href="#contacts" className="block w-full py-2.5 border border-border text-xs font-body font-semibold uppercase tracking-wider text-center text-muted-foreground hover:border-gold hover:text-gold transition-all">
                    Обсудить участие
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* CALCULATOR */}
      <section id="calc" className="py-24 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-6">Калькулятор</div>
              <h2 className="section-title mb-4">
                Оцените{" "}
                <span className="text-gold italic">параметры</span>
              </h2>
              <p className="text-muted-foreground font-body mb-4">
                Финансовые условия и возможная доходность определяются параметрами конкретного проекта и согласовываются сторонами индивидуально.
              </p>
              <p className="text-xs text-muted-foreground font-body mb-10 border-l-2 border-[hsl(var(--gold)/0.4)] pl-4">
                Калькулятор носит ориентировочный характер и не является публичной офертой.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-body font-semibold uppercase tracking-wider">
                      Объём участия
                    </label>
                    <span className="text-gold font-display text-lg font-semibold">
                      {formatMln(amount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={50000000}
                    step={500000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
                    <span>1 млн</span>
                    <span>50 млн</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-body font-semibold uppercase tracking-wider">
                      Ориентир доходности
                    </label>
                    <span className="text-gold font-display text-lg font-semibold">{rate}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={40}
                    step={1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
                    <span>20%</span>
                    <span>40%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-body font-semibold uppercase tracking-wider">
                      Срок проекта
                    </label>
                    <span className="text-gold font-display text-lg font-semibold">
                      {months} мес.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={12}
                    step={1}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
                    <span>4 мес.</span>
                    <span>12 мес.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background border border-border p-8">
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-3">
                  Объём участия
                </div>
                <div className="font-display text-4xl font-bold mb-1">{formatMln(amount)}</div>
              </div>

              <div className="bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.3)] p-8">
                <div className="text-xs text-gold font-body uppercase tracking-widest mb-3">
                  Ориентир дохода за {months} месяцев
                </div>
                <div className="font-display text-5xl font-bold text-gold mb-2">
                  + {formatMln(profit)}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  При ставке {rate}% годовых (ориентировочно)
                </div>
              </div>

              <div className="bg-background border border-border p-8">
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-3">
                  Итого (ориентировочно)
                </div>
                <div className="font-display text-4xl font-bold">{formatMln(total)}</div>
              </div>

              <a href="#contacts" className="btn-gold w-full text-center py-4 text-sm block">
                Обсудить условия
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ANALYTICS */}
      <section id="analytics" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="tag mb-5">Аналитика</div>
            <h2 className="section-title">
              Показатели{" "}
              <span className="text-gold italic">по проектам</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { num: "₽2.4 млрд", label: "Объём сопровождённых сделок", icon: "TrendingUp", change: "+18%" },
              { num: "143", label: "Завершённых проектов", icon: "CheckCircle", change: "100% расчётов" },
              { num: "4–8 мес.", label: "Средний срок сделки", icon: "BarChart2", change: "Строительство и СМР" },
              { num: "253+ млн", label: "Максимальный контракт", icon: "Users", change: "Инфраструктура" },
            ].map((s) => (
              <div key={s.label} className="card-invest p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon name={s.icon as string} size={20} className="text-gold" />
                  <span className="text-xs text-green-400 font-body">{s.change}</span>
                </div>
                <div className="stat-num mb-2">{s.num}</div>
                <div className="text-sm text-muted-foreground font-body">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-invest p-8">
              <h3 className="font-display text-xl font-semibold mb-6">Распределение по отраслям</h3>
              <div className="space-y-4">
                {[
                  { label: "Строительство и монтаж", pct: 42, val: "₽1.01 млрд" },
                  { label: "Закупка оборудования", pct: 35, val: "₽840 млн" },
                  { label: "Инфраструктура", pct: 15, val: "₽360 млн" },
                  { label: "Прочее", pct: 8, val: "₽192 млн" },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm font-body mb-2">
                      <span className="text-muted-foreground">{b.label}</span>
                      <span className="font-semibold">{b.val}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-invest p-8">
              <h3 className="font-display text-xl font-semibold mb-6">Доходность по кварталам</h3>
              <div className="flex items-end gap-2 h-40">
                {[
                  { q: "Q1 24", pct: 72, val: "28.8%" },
                  { q: "Q2 24", pct: 78, val: "31.2%" },
                  { q: "Q3 24", pct: 70, val: "28.0%" },
                  { q: "Q4 24", pct: 82, val: "32.8%" },
                  { q: "Q1 25", pct: 78, val: "31.2%" },
                  { q: "Q2 25", pct: 85, val: "34.0%" },
                ].map((b) => (
                  <div key={b.q} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-gold font-body font-semibold">{b.val}</div>
                    <div
                      className="w-full bg-gradient-to-t from-[hsl(var(--gold))] to-[hsl(var(--gold)/0.4)]"
                      style={{ height: `${b.pct}%` }}
                    />
                    <div className="text-xs text-muted-foreground font-body">{b.q}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section id="faq" className="py-24 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <div className="tag mb-5">FAQ</div>
              <h2 className="section-title">
                Частые{" "}
                <span className="text-gold italic">вопросы</span>
              </h2>
            </div>

            <div className="space-y-2">
              {faqs.map((f, i) => (
                <div key={i} className="border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-background transition-all"
                  >
                    <span className="font-body font-semibold text-sm pr-4">{f.q}</span>
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={16}
                      className="text-gold flex-shrink-0"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-sm text-muted-foreground font-body leading-relaxed border-t border-border pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="tag mb-6">Контакты</div>
              <h2 className="section-title mb-6">
                Обсудим{" "}
                <span className="text-gold italic">ваш проект</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10">
                Оставьте заявку, и мы свяжемся с вами для предварительного обсуждения. Рассматриваем как подрядчиков с контрактами, так и инвесторов и партнёров.
              </p>
              <div className="space-y-4 mb-8">
                <a
                  href="tel:+79132024444"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] group-hover:bg-[hsl(var(--gold)/0.2)] transition-all">
                    <Icon name="Phone" size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-body group-hover:text-gold transition-colors">Телефон</div>
                    <div className="text-xs text-muted-foreground font-body">+7 (913) 202-44-44</div>
                  </div>
                </a>
                <a
                  href="https://t.me/investments_realty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] group-hover:bg-[hsl(var(--gold)/0.2)] transition-all">
                    <Icon name="Send" size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-body group-hover:text-gold transition-colors">Telegram-канал</div>
                    <div className="text-xs text-muted-foreground font-body">@investments_realty</div>
                  </div>
                </a>
                <a
                  href="mailto:viktor_kutakov@vk.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] group-hover:bg-[hsl(var(--gold)/0.2)] transition-all">
                    <Icon name="Mail" size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-body group-hover:text-gold transition-colors">Email</div>
                    <div className="text-xs text-muted-foreground font-body">viktor_kutakov@vk.com</div>
                  </div>
                </a>
              </div>

              <div className="border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.03)] p-5">
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  <span className="text-gold font-semibold">Мы рассматриваем</span> инвесторов и партнёров для участия в проектах. Участие возможно после предварительного отбора и обсуждения условий сотрудничества.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-8">
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.3)] mb-6">
                    <Icon name="Check" size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3">Заявка отправлена</h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Мы свяжемся с вами в ближайшее время для предварительного обсуждения.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <div className="text-sm font-body font-semibold uppercase tracking-wider mb-1">Оставить заявку</div>
                    <div className="text-xs text-muted-foreground font-body">Укажите как вас зовут и как с вами связаться</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-[hsl(var(--gold)/0.6)] transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Телефон / Telegram</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-[hsl(var(--gold)/0.6)] transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Кратко о проекте или запросе</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-[hsl(var(--gold)/0.6)] transition-colors resize-none"
                      placeholder="Подрядчик / Инвестор, объём, отрасль..."
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 text-sm">
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gold flex items-center justify-center">
                <span className="text-[10px] font-bold text-[hsl(var(--navy))] font-body">КИ</span>
              </div>
              <div>
                <span className="font-display text-lg font-semibold tracking-wide text-foreground">КонтрактИнвест</span>
                <div className="text-xs text-muted-foreground font-body">ООО «Стайл»</div>
              </div>
            </div>
            <div className="max-w-lg">
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                <span className="font-semibold text-foreground">Дисклеймер:</span> Информация на сайте не является публичной офертой и предложением к инвестированию. Все условия сотрудничества определяются индивидуально в рамках договорных отношений.
              </p>
            </div>
          </div>
          <div className="divider" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <div className="text-xs text-muted-foreground font-body">
              © 2025 ООО «Стайл». КонтрактИнвест — организатор сделок контрактного финансирования.
            </div>
            <div className="flex gap-6">
              {["Политика конфиденциальности", "Оферта"].map((l) => (
                <a key={l} href="#" className="text-xs text-muted-foreground hover:text-gold transition-colors font-body">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}