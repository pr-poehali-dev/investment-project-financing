export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-gold flex items-center justify-center">
              <span className="text-[10px] font-bold text-[hsl(var(--navy))] font-body">КИ</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-wide">КонтрактИнвест</span>
          </a>
          <a href="/" className="text-sm text-muted-foreground hover:text-gold transition-colors font-body">
            ← Вернуться на сайт
          </a>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">
          Политика конфиденциальности
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-12">
          Последнее обновление: 22 марта 2026 г.
        </p>

        <div className="space-y-10 font-body text-sm leading-relaxed text-foreground/90">

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных физических лиц (далее — «Пользователи»), передаваемых при использовании сайта и формы обратной связи.
            </p>
            <p className="mt-3">
              Оператором персональных данных является: <strong>Общество с ограниченной ответственностью «Стайл»</strong>, ИНН 5406524438, юридический адрес: Новосибирская область, г. Обь, ул. Геодезическая, д. 96.
            </p>
            <p className="mt-3">
              Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">2. Какие данные мы собираем</h2>
            <p>При заполнении формы обратной связи мы получаем следующие данные:</p>
            <ul className="mt-3 space-y-2 list-none">
              {["Имя (фамилия, имя, отчество — в той мере, в которой Пользователь указывает их самостоятельно)", "Контактная информация: номер телефона, адрес электронной почты или иной способ связи, указанный Пользователем", "Содержание обращения (сообщение, описание запроса или проекта)"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">3. Цели обработки персональных данных</h2>
            <p>Персональные данные обрабатываются исключительно в следующих целях:</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Обработка входящих заявок и обращений",
                "Связь с Пользователем для предварительного обсуждения запроса",
                "Исполнение договорных обязательств при наличии заключённого договора",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">4. Хранение данных</h2>
            <p>
              Все персональные данные хранятся исключительно на серверах, расположенных на территории <strong>Российской Федерации</strong>, в соответствии с требованиями ст. 18 Федерального закона № 152-ФЗ.
            </p>
            <p className="mt-3">
              Данные хранятся в течение срока, необходимого для достижения целей обработки, либо до момента отзыва согласия Пользователем, если иное не предусмотрено законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">5. Передача данных третьим лицам</h2>
            <p>
              Персональные данные не передаются третьим лицам, не продаются и не раскрываются, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">6. Права субъекта персональных данных</h2>
            <p>Пользователь вправе в любое время:</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Получить информацию об обработке своих персональных данных",
                "Потребовать уточнения, блокировки или уничтожения своих данных",
                "Отозвать согласие на обработку персональных данных",
                "Обратиться с жалобой в Роскомнадзор (rkn.gov.ru)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">7. Контактная информация</h2>
            <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
            <div className="mt-4 space-y-2">
              <p><span className="text-muted-foreground">Оператор:</span> ООО «Стайл»</p>
              <p><span className="text-muted-foreground">ИНН:</span> 5406524438</p>
              <p><span className="text-muted-foreground">Адрес:</span> Новосибирская область, г. Обь, ул. Геодезическая, д. 96</p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                <a href="mailto:viktor_kutakov@vk.com" className="text-gold hover:opacity-80 transition-opacity">
                  viktor_kutakov@vk.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3 text-foreground">8. Изменения политики</h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на данной странице. Продолжение использования сайта после внесения изменений означает согласие с обновлённой Политикой.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container max-w-4xl mx-auto px-6 py-8 text-center text-xs text-muted-foreground font-body">
          © 2026 ООО «Стайл». Все права защищены.
        </div>
      </footer>
    </div>
  );
}
