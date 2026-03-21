import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/6c5f0413-1283-4f01-907d-771ff3b2886d/files/e18b860e-30ff-4877-a02e-414bbb761243.jpg";
const CONSTRUCTION_IMAGE = "https://cdn.poehali.dev/projects/6c5f0413-1283-4f01-907d-771ff3b2886d/files/868e0c41-3e50-48fc-a101-2426ca3ae652.jpg";

const projects = [
  {
    id: 1,
    name: "Поставка медицинского оборудования",
    client: "Министерство здравоохранения",
    amount: "48 500 000 ₽",
    yield: "28%",
    term: "5 мес.",
    progress: 65,
    status: "Активный",
    category: "Оборудование",
  },
  {
    id: 2,
    name: "Монтаж инженерных систем ТЦ",
    client: "ГК «Девелопмент-Юг»",
    amount: "73 200 000 ₽",
    yield: "31%",
    term: "6 мес.",
    progress: 40,
    status: "Активный",
    category: "СМР",
  },
  {
    id: 3,
    name: "Закуп строительной техники",
    client: "ООО «ДорСтрой»",
    amount: "29 100 000 ₽",
    yield: "26%",
    term: "4 мес.",
    progress: 85,
    status: "Завершается",
    category: "Оборудование",
  },
  {
    id: 4,
    name: "Электромонтажные работы АЭС",
    client: "Росатом",
    amount: "142 000 000 ₽",
    yield: "34%",
    term: "8 мес.",
    progress: 20,
    status: "Новый",
    category: "СМР",
  },
];

const faqs = [
  {
    q: "Как гарантирована доходность?",
    a: "Контракты уже выиграны и подписаны с заказчиками — государственными структурами и крупными компаниями. Оплата по контракту покрывает возврат инвестиций и прибыль инвестора. Дополнительно мы оформляем обеспечительные меры: залог, поручительство, страхование.",
  },
  {
    q: "Что такое контрактное финансирование?",
    a: "Это модель, при которой инвестор финансирует исполнение уже заключённого государственного или корпоративного контракта. Подрядчик выиграл тендер, но для закупки оборудования или начала работ нужны оборотные средства. Инвестор предоставляет их и получает фиксированный доход.",
  },
  {
    q: "Каков минимальный размер инвестиций?",
    a: "Минимальный порог входа — 1 000 000 рублей. Для крупных контрактов возможны совместные инвестиции нескольких участников.",
  },
  {
    q: "Как проходит верификация инвестора (KYC)?",
    a: "Процесс занимает 1–2 рабочих дня: заполнение анкеты, подтверждение личности (паспорт), подтверждение источника средств. После верификации открывается доступ ко всем проектам и документам.",
  },
  {
    q: "Как выплачивается доход?",
    a: "Доход выплачивается единовременно по завершении контракта вместе с телом инвестиции. Возможна частичная выплата по этапам — оговаривается индивидуально.",
  },
  {
    q: "Можно ли досрочно выйти из проекта?",
    a: "Досрочный выход возможен через переуступку права требования другому инвестору с нашей площадки. Мы помогаем организовать этот процесс.",
  },
];

export default function Index() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(28);
  const [months, setMonths] = useState(6);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

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
              ["О платформе", "#about"],
              ["Инвестиции", "#invest"],
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
          <button className="btn-gold hidden md:block">
            Стать инвестором
          </button>
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
              Контрактное финансирование
            </div>
            <h1
              className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6 animate-fade-in-up opacity-0 delay-100"
              style={{ animationFillMode: 'forwards' }}
            >
              Инвестиции<br />
              с{" "}
              <span className="text-gold italic">гарантией</span>
              <br />
              исполнения
            </h1>
            <p
              className="text-lg text-muted-foreground font-body font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up opacity-0 delay-200"
              style={{ animationFillMode: 'forwards' }}
            >
              Контракты уже выиграны. Вашим средствам нужна только точка
              приложения — строительство и оборудование с доходностью{" "}
              <span className="text-gold font-medium">от 25% годовых</span>.
            </p>
            <div
              className="flex flex-wrap gap-4 mb-16 animate-fade-in-up opacity-0 delay-300"
              style={{ animationFillMode: 'forwards' }}
            >
              <button className="btn-gold">Начать инвестировать</button>
              <button className="btn-outline-gold">Узнать подробнее</button>
            </div>

            <div
              className="grid grid-cols-3 gap-8 animate-fade-in-up opacity-0 delay-400"
              style={{ animationFillMode: 'forwards' }}
            >
              {[
                { num: "от 25%", label: "Годовых" },
                { num: "от 4 мес.", label: "Срок инвестиций" },
                { num: "100%", label: "Контракты выиграны" },
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
              <div className="tag mb-6">О платформе</div>
              <h2 className="section-title mb-6">
                Надёжная модель.<br />
                <span className="text-gold italic">Проверенные</span> контракты.
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                КонтрактИнвест — инвестиционная платформа, специализирующаяся
                на финансировании государственных и корпоративных контрактов.
                Мы работаем с подрядчиками, которые уже выиграли тендеры, но
                нуждаются в оборотных средствах.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-10">
                Ваши инвестиции направляются напрямую на закупку оборудования
                и финансирование строительно-монтажных работ. Доход фиксирован
                и обеспечен обязательствами по контракту.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "ShieldCheck", label: "Верификация KYC", desc: "Полная проверка всех участников" },
                  { icon: "FileText", label: "Юридическая защита", desc: "Договор инвестирования, залог" },
                  { icon: "TrendingUp", label: "Прозрачная отчётность", desc: "Финансовые отчёты по каждому проекту" },
                  { icon: "Lock", label: "Хранилище документов", desc: "Все договоры в одном месте" },
                ].map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)]">
                      <Icon name={f.icon as string} size={16} className="text-gold" />
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
                src={CONSTRUCTION_IMAGE}
                alt="Строительство"
                className="w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-6 w-56">
                <div className="text-3xl font-display font-bold text-gold mb-1">₽ 2.4 млрд</div>
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest">
                  Профинансировано<br />контрактов
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* INVEST CONDITIONS */}
      <section id="invest" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="tag mb-5">Условия инвестирования</div>
            <h2 className="section-title mb-4">
              Как это{" "}
              <span className="text-gold italic">работает</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Простая и прозрачная схема — от верификации до получения дохода
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { step: "01", icon: "UserCheck", title: "Верификация", desc: "Проходите KYC-проверку за 1–2 дня. Безопасность всех участников." },
              { step: "02", icon: "Search", title: "Выбор проекта", desc: "Изучаете контракт, документацию, финансовую модель." },
              { step: "03", icon: "FileSignature", title: "Договор", desc: "Подписываете инвестиционный договор с обеспечением." },
              { step: "04", icon: "Banknote", title: "Доход", desc: "Получаете тело + прибыль по завершении контракта." },
            ].map((s) => (
              <div key={s.step} className="card-invest p-6 relative">
                <div className="absolute top-4 right-4 font-display text-4xl font-bold text-[hsl(var(--gold)/0.08)]">
                  {s.step}
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.2)] mb-4">
                  <Icon name={s.icon as string} size={18} className="text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Базовый",
                min: "1 000 000 ₽",
                rate: "от 25%",
                term: "4–6 мес.",
                features: ["Один проект", "Стандартная отчётность", "Чат поддержки"],
                highlight: false,
              },
              {
                title: "Профессиональный",
                min: "5 000 000 ₽",
                rate: "от 28%",
                term: "4–8 мес.",
                features: ["До 3 проектов", "Расширенная аналитика", "Личный консультант", "Приоритетный доступ"],
                highlight: true,
              },
              {
                title: "Институциональный",
                min: "от 20 000 000 ₽",
                rate: "от 32%",
                term: "Индивидуально",
                features: ["Неограниченно проектов", "Персональные условия", "Dedicated менеджер", "Ранний доступ к сделкам"],
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.title}
                className={`card-invest p-8 relative flex flex-col ${tier.highlight ? "border-gold ring-1 ring-[hsl(var(--gold)/0.3)]" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="tag text-[10px]">Популярный</span>
                  </div>
                )}
                <div className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">{tier.title}</div>
                <div className="font-display text-4xl font-bold text-gold mb-1">{tier.rate}</div>
                <div className="text-sm text-muted-foreground font-body mb-1">годовых</div>
                <div className="divider my-4" />
                <div className="mb-1 text-sm font-body">
                  <span className="text-muted-foreground">Минимум: </span>
                  <span className="font-semibold">{tier.min}</span>
                </div>
                <div className="mb-6 text-sm font-body">
                  <span className="text-muted-foreground">Срок: </span>
                  <span className="font-semibold">{tier.term}</span>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                      <Icon name="Check" size={14} className="text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 text-sm font-body font-semibold uppercase tracking-wider transition-all ${
                    tier.highlight ? "btn-gold" : "btn-outline-gold"
                  }`}
                >
                  Выбрать тариф
                </button>
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
              <div className="tag mb-4">Активные проекты</div>
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
                    <div className="font-body font-semibold text-sm">{p.amount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Доходность</div>
                    <div className="font-display text-lg font-bold text-gold">{p.yield}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Срок</div>
                    <div className="font-body font-semibold text-sm">{p.term}</div>
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
                </div>

                <button className="w-full py-2.5 border border-border text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground hover:border-gold hover:text-gold transition-all">
                  Подробнее о проекте
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CALCULATOR */}
      <section id="calc" className="py-24 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tag mb-6">Калькулятор доходности</div>
              <h2 className="section-title mb-4">
                Рассчитайте{" "}
                <span className="text-gold italic">вашу прибыль</span>
              </h2>
              <p className="text-muted-foreground font-body mb-10">
                Используйте калькулятор, чтобы оценить потенциальный доход от инвестиций в контрактное финансирование.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-body font-semibold uppercase tracking-wider">
                      Сумма инвестиций
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
                      Ставка доходности
                    </label>
                    <span className="text-gold font-display text-lg font-semibold">{rate}%</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={40}
                    step={1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-body mt-1">
                    <span>25%</span>
                    <span>40%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-body font-semibold uppercase tracking-wider">
                      Срок инвестиций
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
                  Ваша инвестиция
                </div>
                <div className="font-display text-4xl font-bold mb-1">{formatMln(amount)}</div>
              </div>

              <div className="bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.3)] p-8">
                <div className="text-xs text-gold font-body uppercase tracking-widest mb-3">
                  Ваша прибыль за {months} месяцев
                </div>
                <div className="font-display text-5xl font-bold text-gold mb-2">
                  + {formatMln(profit)}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  При ставке {rate}% годовых
                </div>
              </div>

              <div className="bg-background border border-border p-8">
                <div className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-3">
                  Итого на руки
                </div>
                <div className="font-display text-4xl font-bold">{formatMln(total)}</div>
              </div>

              <button className="btn-gold w-full text-center py-4 text-sm">
                Инвестировать {formatMln(amount)}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ANALYTICS */}
      <section id="analytics" className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="tag mb-5">Аналитика платформы</div>
            <h2 className="section-title">
              Показатели{" "}
              <span className="text-gold italic">эффективности</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { num: "₽2.4 млрд", label: "Профинансировано контрактов", icon: "TrendingUp", change: "+18%" },
              { num: "143", label: "Завершённых проектов", icon: "CheckCircle", change: "100% выплат" },
              { num: "31.2%", label: "Средняя доходность", icon: "BarChart2", change: "+2.4% к прошлому кварталу" },
              { num: "847", label: "Активных инвесторов", icon: "Users", change: "+124 за месяц" },
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
              <div className="flex items-end gap-3 h-40">
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

      {/* PORTFOLIO & DOCUMENTS */}
      <section id="portfolio" className="py-24 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="tag mb-5">Личный кабинет</div>
              <h2 className="section-title mb-6">
                Портфель и{" "}
                <span className="text-gold italic">документы</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Все инвестиции, договоры, финансовые отчёты и уведомления —
                в едином защищённом кабинете инвестора.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "Wallet", title: "Портфель инвестиций", desc: "Все активные и завершённые инвестиции" },
                  { icon: "FileText", title: "Хранилище документов", desc: "Договоры, акты, отчёты по каждому проекту" },
                  { icon: "BarChart3", title: "Финансовые отчёты", desc: "Ежеквартальная и годовая отчётность" },
                  { icon: "Bell", title: "Система уведомлений", desc: "Обновления проектов, платежи, новости" },
                  { icon: "MessageCircle", title: "Чат с консультантом", desc: "Ответы на вопросы в рабочие часы" },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-4 p-4 bg-background border border-border hover:border-[hsl(var(--gold)/0.3)] transition-all group cursor-pointer">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] group-hover:bg-[hsl(var(--gold)/0.2)] transition-all">
                      <Icon name={f.icon as string} size={16} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold font-body">{f.title}</div>
                      <div className="text-xs text-muted-foreground font-body">{f.desc}</div>
                    </div>
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-gold transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-body font-semibold uppercase tracking-wider">Мой портфель</span>
                  <span className="tag">Демо-режим</span>
                </div>
                <div className="space-y-3">
                  {projects.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <div className="text-sm font-body font-medium">{p.name.slice(0, 30)}…</div>
                        <div className="text-xs text-muted-foreground font-body">{p.term} · {p.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gold font-display text-lg font-semibold">{p.yield}</div>
                        <div className="text-xs text-muted-foreground font-body">{p.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border border-border p-6">
                <div className="text-sm font-body font-semibold uppercase tracking-wider mb-4">Последние уведомления</div>
                <div className="space-y-3">
                  {[
                    { icon: "CheckCircle", text: "Выплата по проекту «Закуп техники» — ₽14.3M", time: "2 ч. назад", color: "text-green-400" },
                    { icon: "Bell", text: "Новый проект: Электромонтажные работы АЭС", time: "1 день назад", color: "text-gold" },
                    { icon: "FileText", text: "Добавлен ежеквартальный отчёт Q1 2025", time: "3 дня назад", color: "text-blue-400" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon name={n.icon as string} size={14} className={`${n.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="text-xs font-body">{n.text}</div>
                        <div className="text-xs text-muted-foreground font-body">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section id="faq" className="py-24 bg-background">
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
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-card transition-all"
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
      <section id="contacts" className="py-24 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="tag mb-6">Контакты</div>
              <h2 className="section-title mb-6">
                Начните{" "}
                <span className="text-gold italic">сегодня</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-10">
                Оставьте заявку, и наш консультант свяжется с вами в течение
                рабочего дня. Расскажем о текущих проектах и подберём
                оптимальные условия.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "+7 (800) 000-00-00", sub: "Бесплатно, пн–пт 9:00–18:00" },
                  { icon: "Mail", label: "invest@kontraktinvest.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", label: "Москва, Пресненская наб. 12", sub: "Башня Федерация, 55 этаж" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)]">
                      <Icon name={c.icon as string} size={16} className="text-gold" />
                    </div>
                    <div>
                      <div className="font-body font-semibold text-sm">{c.label}</div>
                      <div className="text-xs text-muted-foreground font-body">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background border border-border p-8">
              <h3 className="font-display text-2xl font-semibold mb-6">Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Петров"
                    className="w-full bg-card border border-border px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-card border border-border px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Сумма инвестиций
                  </label>
                  <select className="w-full bg-card border border-border px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-all appearance-none">
                    <option value="">Выберите диапазон</option>
                    <option>1–5 млн ₽</option>
                    <option>5–20 млн ₽</option>
                    <option>20–100 млн ₽</option>
                    <option>Более 100 млн ₽</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Комментарий
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ваши вопросы или пожелания"
                    className="w-full bg-card border border-border px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-all resize-none"
                  />
                </div>
                <button className="btn-gold w-full py-4">
                  Отправить заявку
                </button>
                <p className="text-xs text-muted-foreground font-body text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-background border-t border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gold flex items-center justify-center">
                <span className="text-[10px] font-bold text-[hsl(var(--navy))] font-body">КИ</span>
              </div>
              <span className="font-display text-lg font-semibold">КонтрактИнвест</span>
            </div>
            <div className="text-xs text-muted-foreground font-body text-center">
              © 2025 КонтрактИнвест. Инвестиционная деятельность сопряжена с рисками.
            </div>
            <div className="flex gap-6">
              {["Политика", "Оферта", "Раскрытие"].map((l) => (
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