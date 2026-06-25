// ============================================
// INNOMOTOR AGENDA v4 — Actualizado 24/06/2026 20:45h
// ============================================

// Fecha y hora de última actualización (actualizar en cada deploy)
const APP_VERSION = 'v4';
const APP_UPDATED = '25/06/2026 12:45h';

// --- DATA ---
const DEFAULT_TASKS = [
  // ===== URGENTE / JULIO 2026 =====
  { id: 1, title: "Modelo 303 — IVA Q2/2026", desc: "INNOMOTOR. Sin actividad = resultado 0€. Presentar en Sede Electrónica AEAT.", date: "2026-07-20", type: "tax", status: "pending", amount: "0€", alerts: { d5: false, d1: false, d0: false } },
  { id: 2, title: "Modelo 130 — IRPF Q2/2026", desc: "Pablo autónomo. Sin ingresos = resultado 0€.", date: "2026-07-20", type: "tax", status: "pending", amount: "0€", alerts: { d5: false, d1: false, d0: false } },
  { id: 3, title: "Modelo 115 — Retención alquiler Q2", desc: "Retención IRPF alquiler Mateo Martos. Abril + mayo + junio (3 × 76€). INNOMOTOR como arrendatario.", date: "2026-07-20", type: "tax", status: "pending", amount: "228€", alerts: { d5: false, d1: false, d0: false } },
  { id: 4, title: "Revisar cobro nómina Alemania — Provenzano", desc: "Salario devengado 8-30 junio (23 días). Bruto ~3.450€, neto ~2.650€ (Steuerklasse 3). Kfz-Meisterbetrieb Schwabing Provenzano GmbH. Si no llega → Arbeitsgericht München.", date: "2026-07-15", type: "work", status: "pending", amount: "~2.650€", alerts: { d5: false, d1: false, d0: false } },
  { id: 5, title: "Acción legal Alemania si no cobra", desc: "Demanda ante Arbeitsgericht München (gratuita 1ª instancia). Base: §611a BGB — salario devengado aunque empleador exima de asistir (Freistellung). Primera carta 16/06 fija fin contrato 30/06. Segunda carta (18/06 disciplinario) sin base legal.", date: "2026-07-20", type: "work", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 6, title: "Contactar Corinna Fischer — EURES TMS", desc: "ZAV.Customer-Center-114@arbeitsagentur.de — Informar del despido para proteger pagos del programa EURES.", date: "2026-07-10", type: "work", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },

  // ===== JULIO-AGOSTO 2026 =====
  { id: 7, title: "Factura alquiler — rectificar a INNOMOTOR", desc: "Pedir a Mateo Martos Instalaciones Eléctricas SL (B-12402525) que emita factura a nombre de INNOMOTOR SOLUTIONS SL / B22503429 en vez de a Pablo personal. Afecta deducibilidad IVA (84€/mes) e IS.", date: "2026-07-31", type: "admin", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 8, title: "Contrato arrendamiento — pasar a INNOMOTOR", desc: "Renovar/modificar contrato de alquiler del local: titular debe ser INNOMOTOR SOLUTIONS SL, no Pablo persona física.", date: "2026-07-31", type: "admin", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },

  // ===== CUOTAS RETA MENSUALES =====
  { id: 20, title: "Cuota RETA — julio 2026", desc: "Cuota autónomo. Tarifa plana si prórroga aprobada: 88,56€. Si no: ~290€. Domiciliada en cuenta BBVA.", date: "2026-07-31", type: "ss", status: "pending", amount: "88,56€", alerts: { d5: false, d1: false, d0: false } },
  { id: 21, title: "Cuota RETA — agosto 2026", desc: "Cuota autónomo mensual.", date: "2026-08-31", type: "ss", status: "pending", amount: "88,56€", alerts: { d5: false, d1: false, d0: false } },
  { id: 22, title: "Cuota RETA — septiembre 2026", desc: "Cuota autónomo mensual.", date: "2026-09-30", type: "ss", status: "pending", amount: "88,56€", alerts: { d5: false, d1: false, d0: false } },
  { id: 23, title: "Cuota RETA — octubre 2026", desc: "Cuota autónomo mensual.", date: "2026-10-31", type: "ss", status: "pending", amount: "88,56€", alerts: { d5: false, d1: false, d0: false } },
  { id: 24, title: "Cuota RETA — noviembre 2026", desc: "Cuota autónomo mensual.", date: "2026-11-30", type: "ss", status: "pending", amount: "88,56€", alerts: { d5: false, d1: false, d0: false } },
  { id: 25, title: "Cuota RETA — diciembre 2026", desc: "Cuota autónomo mensual.", date: "2026-12-31", type: "ss", status: "pending", amount: "88,56€", alerts: { d5: false, d1: false, d0: false } },

  // ===== ALQUILER MENSUAL (desde junio en adelante) =====
  { id: 30, title: "Pago alquiler — julio 2026", desc: "Mateo Martos. Base 400€ + 84€ IVA − 76€ IRPF = 408€ neto.", date: "2026-07-05", type: "admin", status: "pending", amount: "408€", alerts: { d5: false, d1: false, d0: false } },
  { id: 31, title: "Pago alquiler — agosto 2026", desc: "Mateo Martos. Base 400€ + 84€ IVA − 76€ IRPF = 408€ neto.", date: "2026-08-05", type: "admin", status: "pending", amount: "408€", alerts: { d5: false, d1: false, d0: false } },
  { id: 32, title: "Pago alquiler — septiembre 2026", desc: "Mateo Martos. Base 400€ + 84€ IVA − 76€ IRPF = 408€ neto.", date: "2026-09-05", type: "admin", status: "pending", amount: "408€", alerts: { d5: false, d1: false, d0: false } },
  { id: 33, title: "Pago alquiler — octubre 2026", desc: "Mateo Martos. Base 400€ + 84€ IVA − 76€ IRPF = 408€ neto.", date: "2026-10-05", type: "admin", status: "pending", amount: "408€", alerts: { d5: false, d1: false, d0: false } },
  { id: 34, title: "Pago alquiler — noviembre 2026", desc: "Mateo Martos. Base 400€ + 84€ IVA − 76€ IRPF = 408€ neto.", date: "2026-11-05", type: "admin", status: "pending", amount: "408€", alerts: { d5: false, d1: false, d0: false } },
  { id: 35, title: "Pago alquiler — diciembre 2026", desc: "Mateo Martos. Base 400€ + 84€ IVA − 76€ IRPF = 408€ neto.", date: "2026-12-05", type: "admin", status: "pending", amount: "408€", alerts: { d5: false, d1: false, d0: false } },

  // ===== Q3 2026 — OCTUBRE =====
  { id: 40, title: "Modelo 303 — IVA Q3/2026", desc: "INNOMOTOR. Sede Electrónica AEAT.", date: "2026-10-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 41, title: "Modelo 130 — IRPF Q3/2026", desc: "Pablo autónomo.", date: "2026-10-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 42, title: "Modelo 115 — Retención alquiler Q3", desc: "Jul + ago + sep (3 × 76€).", date: "2026-10-20", type: "tax", status: "pending", amount: "228€", alerts: { d5: false, d1: false, d0: false } },

  // ===== Q4 2026 — ENERO 2027 =====
  { id: 50, title: "Modelo 303 — IVA Q4/2026", desc: "INNOMOTOR.", date: "2027-01-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 51, title: "Modelo 130 — IRPF Q4/2026", desc: "Pablo autónomo.", date: "2027-01-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 52, title: "Modelo 115 — Retención alquiler Q4", desc: "Oct + nov + dic (3 × 76€).", date: "2027-01-20", type: "tax", status: "pending", amount: "228€", alerts: { d5: false, d1: false, d0: false } },
  { id: 53, title: "Modelo 390 — Resumen anual IVA 2026", desc: "INNOMOTOR. Resumen anual obligatorio.", date: "2027-01-30", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 54, title: "Modelo 180 — Resumen anual retenciones alquiler", desc: "INNOMOTOR. Resumen anual del Modelo 115.", date: "2027-01-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },

  // ===== SUBSANACIÓN PENDIENTE =====
  { id: 60, title: "Subsanación RETIR — Registro Mercantil", desc: "Reenviar via IURE (registradores.org) como subsanación ref. entrada 1/2025/9302. Corregir firma electrónica y fecha (15/06/2025).", date: "2026-08-31", type: "admin", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },

  // ===== COMPLETADOS =====
  { id: 100, title: "DNI a Carmen Aguilella (TGSS Onda)", desc: "Copia enviada por email.", date: "2026-06-23", type: "ss", status: "done", amount: "" },
  { id: 101, title: "Modelo 100 — Renta 2025", desc: "Declaración anual presentada. Mixta: cuenta ajena + autónomo.", date: "2026-06-30", type: "tax", status: "done", amount: "" },
  { id: 102, title: "Pago parcial deuda RETA (ago+sep 2025)", desc: "212,51€ pagado con tarjeta BBVA. Cód. autorización: 285967. Ref: 802600165246513.", date: "2026-06-22", type: "ss", status: "done", amount: "212,51€" },
  { id: 103, title: "Prórroga tarifa plana TA.0521", desc: "Solicitada antes del 14/06/2026.", date: "2026-06-14", type: "ss", status: "done", amount: "" },
  { id: 104, title: "Aplazamiento RETA aprobado", desc: "Nº Aplazamiento: 62 12 26 00093117. Aprobado por Carmen Aguilella García (TGSS Onda). Deuda total 727,54€ − 212,51€ pagado = pendiente resolución con cuotas. Domiciliación SEPA firmada: ES44 3081 0893 2350 0082 8969.", date: "2026-06-22", type: "ss", status: "done", amount: "727,54€" },
  { id: 105, title: "Modelo 303 Q1/2026", desc: "Presentado fuera de plazo 30/04/2026. Just. 3037556825222. Resultado 0€.", date: "2026-04-30", type: "tax", status: "done", amount: "0€" },
  { id: 106, title: "Modelo 130 Q1/2026", desc: "Presentado fuera de plazo 30/04/2026. Just. 1307743964676. Resultado 0€.", date: "2026-04-30", type: "tax", status: "done", amount: "0€" },
  { id: 107, title: "Pago alquiler — junio 2026", desc: "Factura AA26000002 de Mateo Martos. ⚠️ Emitida a nombre de Pablo (no INNOMOTOR).", date: "2026-06-05", type: "admin", status: "done", amount: "408€" },
];

// --- SCHEDULED ALARMS (time-based) ---
// NOTA: Las alarmas programadas SIEMPRE se leen del código fuente.
// El estado "fired" se guarda solo en memoria de sesión, no en localStorage,
// para evitar que queden bloqueadas permanentemente.
const SCHEDULED_ALARMS = [
  {
    id: "test-alarm-1",
    title: "✅ PRUEBA DE ALARMA — SISTEMA OK",
    desc: "Las alarmas programadas funcionan correctamente. Este mensaje confirma que el sistema de recordatorios de INNOMOTOR Agenda está operativo.",
    time: "12:55",
    date: "2026-06-25",
    fired: false
  }
];

// --- STATE ---
let tasks = [];
let scheduledAlarms = [];
let activeTab = 'pending';
let alarmActive = false;
let alarmInterval = null;
let alarmPanelOpen = false;
let audioCtx = null;
let settings = {
  soundEnabled: true,
  alert5days: true,
  alert1day: true,
  alertDayOf: true,
};

// --- STORAGE ---
function loadData() {
  try {
    const saved = localStorage.getItem('innomotor_tasks_v2');
    if (saved) {
      tasks = JSON.parse(saved);
    } else {
      tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    }
    const savedSettings = localStorage.getItem('innomotor_settings');
    if (savedSettings) settings = JSON.parse(savedSettings);
    // Las alarmas programadas SIEMPRE se cargan desde el código fuente
    // para que "fired" nunca quede bloqueado en localStorage entre sesiones.
    scheduledAlarms = JSON.parse(JSON.stringify(SCHEDULED_ALARMS));
  } catch (e) {
    tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    scheduledAlarms = JSON.parse(JSON.stringify(SCHEDULED_ALARMS));
  }
}

function saveData() {
  try {
    localStorage.setItem('innomotor_tasks_v2', JSON.stringify(tasks));
    localStorage.setItem('innomotor_settings', JSON.stringify(settings));
    // scheduledAlarms NO se persiste — se resetean desde el código fuente en cada sesión
  } catch (e) {}
}

function resetToDefaults() {
  if (confirm('¿Seguro? Esto borra todos los cambios y restaura los datos originales.')) {
    localStorage.removeItem('innomotor_tasks_v2');
    localStorage.removeItem('innomotor_settings');
    localStorage.removeItem('innomotor_scheduled'); // limpieza por si había datos viejos
    location.reload();
  }
}

// --- AUDIO ---
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playAlarmSound() {
  if (!settings.soundEnabled) return;
  initAudio();
  const now = audioCtx.currentTime;
  // Urgent triple beep
  for (let i = 0; i < 3; i++) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'square';
    osc.frequency.value = i === 1 ? 1200 : 880;
    gain.gain.setValueAtTime(0.45, now + i * 0.22);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18 + i * 0.22);
    osc.start(now + i * 0.22);
    osc.stop(now + 0.2 + i * 0.22);
  }
  // Long warning siren
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.type = 'sawtooth';
  osc2.frequency.setValueAtTime(440, now + 0.7);
  osc2.frequency.linearRampToValueAtTime(880, now + 1.1);
  gain2.gain.setValueAtTime(0.3, now + 0.7);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 1.3);
  osc2.start(now + 0.7);
  osc2.stop(now + 1.3);
}

function startAlarm(taskOrScheduled) {
  if (alarmActive) return;
  alarmActive = true;
  playAlarmSound();
  alarmInterval = setInterval(playAlarmSound, 2000);
  renderAlarmOverlay(taskOrScheduled);
}

function stopAlarm() {
  alarmActive = false;
  if (alarmInterval) { clearInterval(alarmInterval); alarmInterval = null; }
  const overlay = document.getElementById('alarm-overlay');
  if (overlay) overlay.remove();
}

// --- NOTIFICATIONS ---
async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

function sendNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: '/icons/icon-192.png',
      requireInteraction: true,
      vibrate: [300, 100, 300, 100, 300, 100, 300],
      tag: 'innomotor-alarm-' + Date.now()
    });
  }
}

// --- SCHEDULED ALARM CHECK ---
function checkScheduledAlarms() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  scheduledAlarms.forEach(alarm => {
    if (alarm.fired) return;
    if (alarm.date === today && currentTime >= alarm.time) {
      alarm.fired = true;
      // NO guardamos scheduledAlarms en localStorage — se resetean en cada sesión
      startAlarm({ title: alarm.title, desc: alarm.desc, date: alarm.date, amount: '', type: 'admin' });
      sendNotification('🔔 ' + alarm.title, alarm.desc);
    }
  });
}

function scheduleLocalAlarmCheck() {
  setInterval(() => {
    // Check scheduled alarms every 15 seconds
    checkScheduledAlarms();

    if (alarmActive) return;
    const now = new Date();
    const hour = now.getHours();
    if (hour < 8 || hour > 22) return;

    tasks.filter(t => t.status === 'pending' && t.alerts).forEach(t => {
      const days = daysUntil(t.date);
      if (days === 5 && settings.alert5days && !t.alerts.d5) {
        startAlarm(t);
        sendNotification('⚠️ INNOMOTOR — Vence en 5 días', t.title + (t.amount ? ' — ' + t.amount : ''));
        t.alerts.d5 = true;
        saveData();
      } else if (days === 1 && settings.alert1day && !t.alerts.d1) {
        startAlarm(t);
        sendNotification('🔴 INNOMOTOR — ¡VENCE MAÑANA!', t.title + (t.amount ? ' — ' + t.amount : ''));
        t.alerts.d1 = true;
        saveData();
      } else if (days === 0 && settings.alertDayOf && !t.alerts.d0) {
        startAlarm(t);
        sendNotification('🚨 INNOMOTOR — ¡VENCE HOY!', t.title + (t.amount ? ' — ' + t.amount : ''));
        t.alerts.d0 = true;
        saveData();
      }
    });
  }, 15000);
}

// --- HELPERS ---
function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

function getUrgency(dateStr, status) {
  if (status === 'done') return 'done';
  const days = daysUntil(dateStr);
  if (days < 0) return 'urgent';
  if (days <= 7) return 'urgent';
  if (days <= 30) return 'warning';
  return 'normal';
}

function getTypeIcon(type) {
  const map = { tax: '📋', ss: '🛡️', admin: '📎', work: '💼' };
  return map[type] || '📋';
}

function getTypeClass(type) { return type || 'tax'; }

function nextId() { return Math.max(...tasks.map(t => t.id), 0) + 1; }

// --- RENDER ---
function renderAlarmOverlay(task) {
  const days = task.date ? daysUntil(task.date) : null;
  let urgText = task.title || 'ALARMA';
  if (days !== null) {
    if (days === 0) urgText = '¡VENCE HOY!';
    else if (days === 1) urgText = '¡VENCE MAÑANA!';
    else if (days < 0) urgText = '¡VENCIDO HACE ' + Math.abs(days) + ' DÍAS!';
    else urgText = 'VENCE EN ' + days + ' DÍAS';
  }

  const el = document.createElement('div');
  el.id = 'alarm-overlay';
  el.className = 'alarm-overlay';
  el.innerHTML = `
    <div class="alarm-modal pulsing">
      <div class="alarm-icon-big shaking">🔔</div>
      <h2>${urgText}</h2>
      <div class="alarm-task-title">${task.title || ''}</div>
      ${task.date ? '<div class="alarm-detail">' + formatDate(task.date) + '</div>' : ''}
      <div class="alarm-detail">${task.desc || ''}</div>
      ${task.amount ? '<div class="alarm-amount">' + task.amount + '</div>' : ''}
      <button class="confirm-alarm-btn" onclick="stopAlarm()">
        ✅ ENTERADO — SILENCIAR ALARMA
      </button>
    </div>`;
  document.body.appendChild(el);
}

function render() {
  const app = document.getElementById('app');
  const pending = tasks.filter(t => t.status === 'pending').sort((a, b) => new Date(a.date) - new Date(b.date));
  const done = tasks.filter(t => t.status === 'done').sort((a, b) => new Date(b.date) - new Date(a.date));
  const urgentCount = pending.filter(t => getUrgency(t.date, t.status) === 'urgent').length;
  const warningCount = pending.filter(t => getUrgency(t.date, t.status) === 'warning').length;
  const nextDate = pending.length > 0 ? formatDate(pending[0].date) : '—';
  const totalPay = pending.reduce((s, t) => {
    const m = (t.amount || '').match(/[\d.,]+/);
    return s + (m ? parseFloat(m[0].replace(',', '.')) : 0);
  }, 0);

  // Scheduled alarms info
  const pendingScheduled = scheduledAlarms.filter(a => !a.fired);

  let html = '';

  // Top bar
  html += `
    <div class="topbar">
      <div class="topbar-left">
        <div class="topbar-logo">🔧</div>
        <div>
          <div class="topbar-title">INNOMOTOR</div>
          <div class="topbar-sub">Agenda fiscal · B22503429</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
          <div id="reloj-topbar" style="font-size:15px;font-weight:700;color:#111;letter-spacing:0.5px;font-variant-numeric:tabular-nums">--:--:--</div>
          <div title="Última actualización de la app" style="font-size:9px;color:#111;text-align:right;cursor:default;line-height:1.3">
            <span style="font-weight:600">🔄 ${APP_VERSION}</span> · ${APP_UPDATED}
          </div>
        </div>
        <button class="topbar-bell" onclick="testAlarm()">
          🔔
          ${urgentCount > 0 ? '<span class="notif-dot"></span>' : ''}
        </button>
      </div>
    </div>`;

  // Stats
  html += `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Pendientes</div>
        <div class="stat-value">${pending.length}</div>
        <div class="stat-sub">${urgentCount} urgentes · ${warningCount} próximos</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Próximo plazo</div>
        <div class="stat-value small">${nextDate}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">A pagar (est.)</div>
        <div class="stat-value">${Math.round(totalPay).toLocaleString('es-ES')}€</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Completados</div>
        <div class="stat-value" style="color:var(--green-400)">${done.length}</div>
        <div class="stat-sub ok">✓ Al día</div>
      </div>
    </div>`;

  // Scheduled alarm indicator
  if (pendingScheduled.length > 0) {
    html += `<div class="install-banner" style="border-color:var(--amber-200);background:var(--amber-50)">
      <div style="font-size:28px">⏰</div>
      <div class="install-banner-text" style="color:var(--amber-600)">
        <strong>Alarma programada</strong>
        ${pendingScheduled.map(a => a.title + ' — hoy a las ' + a.time).join('<br>')}
      </div>
    </div>`;
  }

  // Install banner
  html += `
    <div class="install-banner" id="install-banner" style="display:none">
      <div style="font-size:28px">📲</div>
      <div class="install-banner-text">
        <strong>Instalar en el móvil</strong>
        Funciona sin conexión y con alarmas
      </div>
      <button class="install-btn" onclick="installApp()">Instalar</button>
    </div>`;

  // Alarm config
  html += `
    <div class="alarm-panel">
      <div class="alarm-panel-header" onclick="toggleAlarmPanel()">
        <div class="alarm-panel-title">🔔 Sistema de alarmas</div>
        <span style="color:var(--text-tertiary)">${alarmPanelOpen ? '▲' : '▼'}</span>
      </div>
      ${alarmPanelOpen ? `
      <div class="alarm-panel-body">
        <div class="alarm-row">
          <span class="alarm-row-label">Sonido activado</span>
          <label class="toggle"><input type="checkbox" ${settings.soundEnabled ? 'checked' : ''} onchange="updateSetting('soundEnabled', this.checked)"><span class="toggle-slider"></span></label>
        </div>
        <div class="alarm-row">
          <span class="alarm-row-label">Aviso 5 días antes</span>
          <label class="toggle"><input type="checkbox" ${settings.alert5days ? 'checked' : ''} onchange="updateSetting('alert5days', this.checked)"><span class="toggle-slider"></span></label>
        </div>
        <div class="alarm-row">
          <span class="alarm-row-label">Aviso 1 día antes</span>
          <label class="toggle"><input type="checkbox" ${settings.alert1day ? 'checked' : ''} onchange="updateSetting('alert1day', this.checked)"><span class="toggle-slider"></span></label>
        </div>
        <div class="alarm-row">
          <span class="alarm-row-label">Aviso el mismo día</span>
          <label class="toggle"><input type="checkbox" ${settings.alertDayOf ? 'checked' : ''} onchange="updateSetting('alertDayOf', this.checked)"><span class="toggle-slider"></span></label>
        </div>
        <button class="test-alarm-btn" onclick="testAlarm()">🔊 PROBAR ALARMA</button>
        <button class="test-alarm-btn" style="margin-top:6px;border-color:var(--gray-300);color:var(--text-secondary);background:var(--gray-100)" onclick="resetToDefaults()">🔄 Restaurar datos originales</button>
      </div>` : ''}
    </div>`;

  // Tabs
  html += `
    <div class="tabs">
      <button class="tab ${activeTab === 'pending' ? 'active' : ''}" onclick="setTab('pending')">⏳ Pendientes (${pending.length})</button>
      <button class="tab ${activeTab === 'done' ? 'active' : ''}" onclick="setTab('done')">✅ Hechos (${done.length})</button>
    </div>`;

  const list = activeTab === 'pending' ? pending : done;

  if (activeTab === 'pending') {
    const groups = {};
    list.forEach(t => {
      const u = getUrgency(t.date, t.status);
      const label = u === 'urgent' ? '🔴 Urgente' : u === 'warning' ? '🟡 Próximo mes' : '🔵 Más adelante';
      if (!groups[label]) groups[label] = [];
      groups[label].push(t);
    });
    for (const [label, items] of Object.entries(groups)) {
      html += `<div class="section-label">${label}</div>`;
      items.forEach(t => { html += renderTaskCard(t); });
    }
  } else {
    list.forEach(t => { html += renderTaskCard(t); });
  }

  html += `
    <button class="add-task-btn" onclick="openAddModal()">➕ Añadir recordatorio</button>
    <div class="bottom-spacer"></div>`;

  app.innerHTML = html;
}

function renderTaskCard(t) {
  const u = getUrgency(t.date, t.status);
  const isDone = t.status === 'done';
  const days = daysUntil(t.date);
  let badgeHtml = '';
  if (isDone) {
    badgeHtml = '<span class="badge badge-done">completado</span>';
  } else if (days < 0) {
    badgeHtml = '<span class="badge badge-urgent">vencido hace ' + Math.abs(days) + 'd</span>';
  } else if (u === 'urgent') {
    badgeHtml = '<span class="badge badge-urgent">' + days + ' días</span>';
  } else if (u === 'warning') {
    badgeHtml = '<span class="badge badge-warning">' + days + ' días</span>';
  } else {
    badgeHtml = '<span class="badge badge-info">' + days + ' días</span>';
  }

  return `
    <div class="task-card ${u}">
      <div class="task-check ${isDone ? 'checked' : ''}" onclick="toggleTask(${t.id})">${isDone ? '✓' : ''}</div>
      <div class="task-icon ${getTypeClass(t.type)}">${getTypeIcon(t.type)}</div>
      <div class="task-content">
        <div class="task-title">${t.title}</div>
        <div class="task-desc">${t.desc}</div>
        <div class="task-meta">
          ${badgeHtml}
          <span class="task-date">${formatDate(t.date)}</span>
          ${t.amount ? '<span class="task-amount">' + t.amount + '</span>' : ''}
        </div>
      </div>
    </div>`;
}

function renderAddModal() {
  const el = document.createElement('div');
  el.id = 'add-modal';
  el.className = 'modal-overlay';
  el.innerHTML = `
    <div class="modal-sheet">
      <h3>Nuevo recordatorio</h3>
      <div class="form-group"><label>Título</label><input type="text" id="new-title" placeholder="Ej: Modelo 303 Q4"></div>
      <div class="form-group"><label>Descripción</label><textarea id="new-desc" placeholder="Detalles..."></textarea></div>
      <div class="form-group"><label>Fecha límite</label><input type="date" id="new-date"></div>
      <div class="form-group"><label>Tipo</label>
        <select id="new-type">
          <option value="tax">📋 Fiscal</option>
          <option value="ss">🛡️ Seguridad Social</option>
          <option value="admin">📎 Administrativo</option>
          <option value="work">💼 Laboral</option>
        </select>
      </div>
      <div class="form-group"><label>Importe (opcional)</label><input type="text" id="new-amount" placeholder="Ej: 228€"></div>
      <div class="form-actions">
        <button class="btn-cancel" onclick="closeAddModal()">Cancelar</button>
        <button class="btn-save" onclick="saveNewTask()">Guardar</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', (e) => { if (e.target === el) closeAddModal(); });
}

// --- ACTIONS ---
function setTab(tab) { activeTab = tab; render(); }

function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (t) { t.status = t.status === 'done' ? 'pending' : 'done'; saveData(); render(); }
}

function toggleAlarmPanel() { alarmPanelOpen = !alarmPanelOpen; render(); }

function updateSetting(key, value) { settings[key] = value; saveData(); }

function testAlarm() {
  const urgentTask = tasks.filter(t => t.status === 'pending').sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  if (urgentTask) startAlarm(urgentTask);
}

function openAddModal() { renderAddModal(); }
function closeAddModal() { const m = document.getElementById('add-modal'); if (m) m.remove(); }

function saveNewTask() {
  const title = document.getElementById('new-title').value.trim();
  const desc = document.getElementById('new-desc').value.trim();
  const date = document.getElementById('new-date').value;
  const type = document.getElementById('new-type').value;
  const amount = document.getElementById('new-amount').value.trim();
  if (!title || !date) { alert('Rellena al menos el título y la fecha'); return; }
  tasks.push({ id: nextId(), title, desc, date, type, status: 'pending', amount, alerts: { d5: false, d1: false, d0: false } });
  saveData(); closeAddModal(); render();
}

// --- PWA INSTALL ---
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('install-banner');
  if (banner) banner.style.display = 'flex';
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      const banner = document.getElementById('install-banner');
      if (banner) banner.style.display = 'none';
    });
  }
}

// --- SERVICE WORKER ---
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      if ('periodicSync' in reg) {
        try { await reg.periodicSync.register('check-deadlines', { minInterval: 3600000 }); } catch (e) {}
      }
    } catch (e) { console.error('SW error:', e); }
  }
}

// --- INIT ---
// --- RELOJ EN TIEMPO REAL ---
function startClock() {
  function tick() {
    const el = document.getElementById('reloj-topbar');
    if (el) {
      const now = new Date();
      const h = now.getHours().toString().padStart(2,'0');
      const m = now.getMinutes().toString().padStart(2,'0');
      const s = now.getSeconds().toString().padStart(2,'0');
      el.textContent = h + ':' + m + ':' + s;
    }
  }
  tick();
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  render();
  registerSW();
  requestNotificationPermission();
  scheduleLocalAlarmCheck();
  checkScheduledAlarms();
  startClock();
});
