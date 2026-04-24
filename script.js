const translations = {
  es: {
    titulo: 'Control de Químicos (1000L)',
    lblQuimico: 'Químico:',
    lblFlujo: 'Flujo de bomba (ml/min):',
    lblNivel: 'Nivel actual del tanque (Litros):',
    lblHoras: 'Horas restantes del turno:',
    btnCalcular: 'Calcular Autonomía',
    txtGasto: 'Gasto por hora:',
    txtLitrosHora: 'L/h',
    txtConsumo: 'Consumo hasta fin de turno:',
    txtLitros: 'Litros',
    txtAutonomia: 'Autonomía total del tanque:',
    txtHoras: 'horas',
    mensajeVacio: 'Ingresa valores válidos para calcular.',
    mensajeOk: 'Resultado calculado correctamente.'
  },
  pt: {
    titulo: 'Controle de Químicos (1000L)',
    lblQuimico: 'Químico:',
    lblFlujo: 'Fluxo da bomba (ml/min):',
    lblNivel: 'Nível atual do tanque (Litros):',
    lblHoras: 'Horas restantes do turno:',
    btnCalcular: 'Calcular Autonomia',
    txtGasto: 'Gasto por hora:',
    txtLitrosHora: 'L/h',
    txtConsumo: 'Consumo até o fim do turno:',
    txtLitros: 'Litros',
    txtAutonomia: 'Autonomia total do tanque:',
    txtHoras: 'horas',
    mensajeVacio: 'Digite valores válidos para calcular.',
    mensajeOk: 'Resultado calculado com sucesso.'
  },
  en: {
    titulo: 'Chemical Control (1000L)',
    lblQuimico: 'Chemical:',
    lblFlujo: 'Pump flow (ml/min):',
    lblNivel: 'Current tank level (Liters):',
    lblHoras: 'Remaining shift hours:',
    btnCalcular: 'Calculate Autonomy',
    txtGasto: 'Hourly usage:',
    txtLitrosHora: 'L/h',
    txtConsumo: 'Consumption by end of shift:',
    txtLitros: 'Liters',
    txtAutonomia: 'Total tank autonomy:',
    txtHoras: 'hours',
    mensajeVacio: 'Enter valid values to calculate.',
    mensajeOk: 'Result calculated successfully.'
  }
};

const selectorIdioma = document.getElementById('selectorIdioma');
const btnCalcular = document.getElementById('btnCalcular');
const cajaResultado = document.getElementById('cajaResultado');
const mensajeAlerta = document.getElementById('mensajeAlerta');

const resGastoHora = document.getElementById('resGastoHora');
const resConsumoTurno = document.getElementById('resConsumoTurno');
const resAutonomia = document.getElementById('resAutonomia');

function applyTranslations(lang) {
  const t = translations[lang] || translations.es;
  document.documentElement.lang = lang;
  document.getElementById('titulo').textContent = t.titulo;
  document.getElementById('lblQuimico').textContent = t.lblQuimico;
  document.getElementById('lblFlujo').textContent = t.lblFlujo;
  document.getElementById('lblNivel').textContent = t.lblNivel;
  document.getElementById('lblHoras').textContent = t.lblHoras;
  btnCalcular.textContent = t.btnCalcular;
  document.getElementById('txtGasto').textContent = t.txtGasto;
  document.getElementById('txtLitrosHora').textContent = t.txtLitrosHora;
  document.getElementById('txtConsumo').textContent = t.txtConsumo;
  document.getElementById('txtLitros').textContent = t.txtLitros;
  document.getElementById('txtAutonomia').textContent = t.txtAutonomia;
  document.getElementById('txtHoras').textContent = t.txtHoras;
}

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function calcularAutonomia() {
  const flujo = parseFloat(document.getElementById('flujo').value);
  const nivel = parseFloat(document.getElementById('nivel').value);
  const horas = parseFloat(document.getElementById('horas').value);
  const lang = selectorIdioma.value;
  const t = translations[lang] || translations.es;

  if (!Number.isFinite(flujo) || flujo <= 0 || !Number.isFinite(nivel) || nivel < 0 || !Number.isFinite(horas) || horas <= 0) {
    mensajeAlerta.textContent = t.mensajeVacio;
    cajaResultado.classList.remove('hidden');
    resGastoHora.textContent = '—';
    resConsumoTurno.textContent = '—';
    resAutonomia.textContent = '—';
    return;
  }

  const gastoHora = (flujo * 60) / 1000;
  const consumoTurno = gastoHora * horas;
  const autonomia = nivel / gastoHora;

  mensajeAlerta.textContent = t.mensajeOk;
  resGastoHora.textContent = formatNumber(gastoHora);
  resConsumoTurno.textContent = formatNumber(consumoTurno);
  resAutonomia.textContent = formatNumber(autonomia);
  cajaResultado.classList.remove('hidden');
}

selectorIdioma.addEventListener('change', () => applyTranslations(selectorIdioma.value));
btnCalcular.addEventListener('click', calcularAutonomia);
applyTranslations(selectorIdioma.value);
