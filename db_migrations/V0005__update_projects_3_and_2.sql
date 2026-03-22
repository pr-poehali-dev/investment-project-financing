UPDATE projects SET
  name = 'Закуп разливочной линии питьевой воды',
  client = 'ЗАО "ИЧА-IV-М"',
  amount = 24000000,
  yield_pct = 24.00,
  term_months = 12,
  progress = 24,
  status = 'Активный'
WHERE id = 3;

UPDATE projects SET
  name = 'Строительство ИЖС по эскроу счетам',
  client = 'ООО Оптима',
  amount = 34000000,
  yield_pct = 25.00,
  term_months = 6,
  progress = 0,
  status = 'Активный'
WHERE id = 2;