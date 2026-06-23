// ============================================
// INNOMOTOR AGENDA — App Principal
// ============================================

// --- DATA ---
const DEFAULT_TASKS = [
  { id: 1, title: "Modelo 303 — IVA Q2/2026", desc: "INNOMOTOR. Sin actividad = resultado 0€", date: "2026-07-20", type: "tax", status: "pending", amount: "0€", alerts: { d5: false, d1: false, d0: false } },
  { id: 2, title: "Modelo 130 — IRPF Q2/2026", desc: "Pablo autónomo. Sin ingresos = resultado 0€", date: "2026-07-20", type: "tax", status: "pending", amount: "0€", alerts: { d5: false, d1: false, d0: false } },
  { id: 3, title: "Modelo 115 — Retención alquiler Q2", desc: "Abril + mayo + junio (3 × 76€)", date: "2026-07-20", type: "tax", status: "pending", amount: "228€", alerts: { d5: false, d1: false, d0: false } },
  { id: 4, title: "Liquidación Alemania — Provenzano", desc: "Si no llega ~2.650€ netos → reclamar Arbeitsgericht München", date: "2026-07-15", type: "work", status: "pending", amount: "~2.650€", alerts: { d5: false, d1: false, d0: false } },
  { id: 5, title: "Resolución aplazamiento RETA", desc: "Esperar carta Carmen Aguilella, TGSS Onda", date: "2026-07-31", type: "ss", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 6, title: "Factura alquiler — rectificar a INNOMOTOR", desc: "Pedir a Mateo Martos: INNOMOTOR SOLUTIONS SL / B22503429", date: "2026-07-31", type: "admin", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 7, title: "Modelo 303 — IVA Q3/2026", desc: "INNOMOTOR", date: "2026-10-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 8, title: "Modelo 130 — IRPF Q3/2026", desc: "Pablo autónomo", date: "2026-10-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 9, title: "Modelo 115 — Retención alquiler Q3", desc: "Jul + ago + sep (3 × 76€)", date: "2026-10-20", type: "tax", status: "pending", amount: "228€", alerts: { d5: false, d1: false, d0: false } },
  { id: 10, title: "Modelo 303 — IVA Q4/2026", desc: "INNOMOTOR", date: "2027-01-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 11, title: "Modelo 130 — IRPF Q4/2026", desc: "Pablo autónomo", date: "2027-01-20", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 12, title: "Modelo 115 — Retención alquiler Q4", desc: "Oct + nov + dic (3 × 76€)", date: "2027-01-20", type: "tax", status: "pending", amount: "228€", alerts: { d5: false, d1: false, d0: false } },
  { id: 13, title: "Modelo 390 — Resumen anual IVA 2026", desc: "INNOMOTOR", date: "2027-01-30", type: "tax", status: "pending", amount: "", alerts: { d5: false, d1: false, d0: false } },
  { id: 100, title: "DNI a Carmen Aguilella", desc: "Copia enviada por email", date: "2026-06-23", type: "ss", status: "done", amount: "" },
  { id: 101, title: "Modelo 100 — Renta 2025", desc: "Presentada", date: "2026-06-30", type: "tax", status: "done", amount: "" },
  { id: 102, title: "Pago parcial deuda RETA", desc: "212,51€ cód. 285967", date: "2026-06-22", type: "ss", status: "done", amount: "212,51€" },
  { id: 103, title: "Prórroga tarifa plana TA.0521", desc: "Solicitada", date: "2026-06-14", type: "ss", status: "done", amount: "" },
  { id: 104, title: "Modelo 303 Q1/2026", desc: "Just. 3037556825222", date: "2026-04-30", type: "tax", status: "done", amount: "0€" },
  { id: 105, title: "Modelo 130 Q1/2026", desc: "Just. 1307743964676", date: "2026-04-30", type: "tax", status: "done", amount: "0€" },
];

// --- STATE ---
let tasks = [];
let activeTab = 'pending';
let alarmActive = false;
let alarmInterval = null;
let alarmPanelOpen = true;
let showAddModal = false;
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
    const saved = localStorage.getItem('innomotor_tasks');
    tasks = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_TASKS));
    const savedSettings = localStorage.getItem('innomotor_settings');
    if (savedSettings) settings = JSON.parse(savedSettings);
  } catch (e) {
    tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
  }
}

function saveData() {
  try {
    localStorage.setItem('innomotor_tasks', JSON.stringify(tasks));
    localStorage.setItem('innomotor_settings', JSON.stringify(settings));
  } catch (e) {}
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
  // Three urgent beeps
  for (let i = 0; i < 3; i++) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'square';
    osc.frequency.value = i === 1 ? 1200 : 880;
    gain.gain.setValueAtTime(0.4, now + i * 0.22);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18 + i * 0.22);
    osc.start(now + i * 0.22);
    osc.stop(now + 0.2 + i * 0.22);
  }
  // Long warning tone
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.type = 'sawtooth';
  osc2.frequency.value = 660;
  gain2.gain.setValueAtTime(0.25, now + 0.7);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
  osc2.start(now + 0.7);
  osc2.stop(now + 1.2);
}

function startAlarm(task) {
  if (alarmActive) return;
  alarmActive = true;
  playAlarmSound();
  alarmInterval = setInterval(playAlarmSound, 2000);
  renderAlarmOverlay(task);
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

function scheduleLocalAlarmCheck() {
  // Check every minute for upcoming deadlines
  setInterval(() => {
    if (alarmActive) return;
    const now = new Date();
    const hour = now.getHours();
    // Only alert between 8:00 and 22:00
    if (hour < 8 || hour > 22) return;

    tasks.filter(t => t.status === 'pending').forEach(t => {
      const days = daysUntil(t.date);
      if (days === 5 && settings.alert5days && !t.alerts.d5) {
        triggerAlert(t, 5);
        t.alerts.d5 = true;
        saveData();
      } else if (days === 1 && settings.alert1day && !t.alerts.d1) {
        triggerAlert(t, 1);
        t.alerts.d1 = true;
        saveData();
      } else if (days === 0 && settings.alertDayOf && !t.alerts.d0) {
        triggerAlert(t, 0);
        t.alerts.d0 = true;
        saveData();
      }
    });
  }, 60000);
}

function triggerAlert(task, daysLeft) {
  // In-app alarm
  startAlarm(task);
  // System notification
  if (Notification.permission === 'granted') {
    let body = task.title;
    if (task.amount) body += ' — ' + task.amount;
    const urgency = daysLeft === 0 ? 'VENCE HOY' : daysLeft === 1 ? 'VENCE MAÑANA' : 'Vence en ' + daysLeft + ' días';
    new Notification('⚠️ INNOMOTOR — ' + urgency, {
      body: body,
      icon: '/icons/icon-192.png',
      requireInteraction: true,
      vibrate: [300, 100, 300, 100, 300],
      tag: 'innomotor-' + task.id
    });
  }
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

function getTypeClass(type) {
  return type || 'tax';
}

function nextId() {
  return Math.max(...tasks.map(t => t.id), 0) + 1;
}

// --- RENDER ---
function renderAlarmOverlay(task) {
  const days = daysUntil(task.date);
  let urgText = 'VENCE EN ' + days + ' DÍAS';
  if (days === 0) urgText = '¡VENCE HOY!';
  else if (days === 1) urgText = '¡VENCE MAÑANA!';
  else if (days < 0) urgText = '¡VENCIDO HACE ' + Math.abs(days) + ' DÍAS!';

  const el = document.createElement('div');
  el.id = 'alarm-overlay';
  el.className = 'alarm-overlay';
  el.innerHTML = `
    <div class="alarm-modal pulsing">
      <div class="alarm-icon-big shaking">🔔</div>
      <h2>${urgText}</h2>
      <div class="alarm-task-title">${task.title}</div>
      <div class="alarm-detail">${formatDate(task.date)}</div>
      <div class="alarm-detail">${task.desc}</div>
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
  const nextDate = pending.length > 0 ? formatDate(pending[0].date) : '—';
  const totalPay = pending.reduce((s, t) => {
    const m = (t.amount || '').match(/[\d.,]+/);
    return s + (m ? parseFloat(m[0].replace(',', '.')) : 0);
  }, 0);

  let html = '';

  // Top bar
  html += `
    <div class="topbar">
      <div class="topbar-left">
        <div class="topbar-logo">🔧</div>
        <div>
          <div class="topbar-title">INNOMOTOR</div>
          <div class="topbar-sub">Agenda fiscal</div>
        </div>
      </div>
      <button class="topbar-bell" onclick="testAlarm()">
        🔔
        ${urgentCount > 0 ? '<span class="notif-dot"></span>' : ''}
      </button>
    </div>`;

  // Stats
  html += `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Pendientes</div>
        <div class="stat-value">${pending.length}</div>
        <div class="stat-sub">${urgentCount} urgentes</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Próximo plazo</div>
        <div class="stat-value small">${nextDate}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">A pagar (est.)</div>
        <div class="stat-value">${Math.round(totalPay)}€</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Completados</div>
        <div class="stat-value" style="color:var(--green-400)">${done.length}</div>
        <div class="stat-sub ok">Todo al día</div>
      </div>
    </div>`;

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
        <div class="alarm-panel-title">
          🔔 Sistema de alarmas
        </div>
        <span style="color:var(--text-tertiary)">${alarmPanelOpen ? '▲' : '▼'}</span>
      </div>
      ${alarmPanelOpen ? `
      <div class="alarm-panel-body">
        <div class="alarm-row">
          <span class="alarm-row-label">Sonido activado</span>
          <label class="toggle">
            <input type="checkbox" ${settings.soundEnabled ? 'checked' : ''} onchange="updateSetting('soundEnabled', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="alarm-row">
          <span class="alarm-row-label">Aviso 5 días antes</span>
          <label class="toggle">
            <input type="checkbox" ${settings.alert5days ? 'checked' : ''} onchange="updateSetting('alert5days', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="alarm-row">
          <span class="alarm-row-label">Aviso 1 día antes</span>
          <label class="toggle">
            <input type="checkbox" ${settings.alert1day ? 'checked' : ''} onchange="updateSetting('alert1day', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="alarm-row">
          <span class="alarm-row-label">Aviso el mismo día</span>
          <label class="toggle">
            <input type="checkbox" ${settings.alertDayOf ? 'checked' : ''} onchange="updateSetting('alertDayOf', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <button class="test-alarm-btn" onclick="testAlarm()">
          🔊 PROBAR ALARMA
        </button>
      </div>` : ''}
    </div>`;

  // Tabs
  html += `
    <div class="tabs">
      <button class="tab ${activeTab === 'pending' ? 'active' : ''}" onclick="setTab('pending')">
        ⏳ Pendientes (${pending.length})
      </button>
      <button class="tab ${activeTab === 'done' ? 'active' : ''}" onclick="setTab('done')">
        ✅ Completados (${done.length})
      </button>
    </div>`;

  // Tasks
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

  // Add button
  html += `
    <button class="add-task-btn" onclick="openAddModal()">
      ➕ Añadir recordatorio
    </button>
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
    badgeHtml = `<span class="badge badge-urgent">vencido hace ${Math.abs(days)}d</span>`;
  } else if (u === 'urgent') {
    badgeHtml = `<span class="badge badge-urgent">${days} días</span>`;
  } else if (u === 'warning') {
    badgeHtml = `<span class="badge badge-warning">${days} días</span>`;
  } else {
    badgeHtml = `<span class="badge badge-info">${days} días</span>`;
  }

  return `
    <div class="task-card ${u}">
      <div class="task-check ${isDone ? 'checked' : ''}" onclick="toggleTask(${t.id})">
        ${isDone ? '✓' : ''}
      </div>
      <div class="task-icon ${getTypeClass(t.type)}">
        ${getTypeIcon(t.type)}
      </div>
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
  const overlay = document.createElement('div');
  overlay.id = 'add-modal';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <h3>Nuevo recordatorio</h3>
      <div class="form-group">
        <label>Título</label>
        <input type="text" id="new-title" placeholder="Ej: Modelo 303 Q4">
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <textarea id="new-desc" placeholder="Detalles del trámite..."></textarea>
      </div>
      <div class="form-group">
        <label>Fecha límite</label>
        <input type="date" id="new-date">
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select id="new-type">
          <option value="tax">📋 Fiscal</option>
          <option value="ss">🛡️ Seguridad Social</option>
          <option value="admin">📎 Administrativo</option>
          <option value="work">💼 Laboral</option>
        </select>
      </div>
      <div class="form-group">
        <label>Importe (opcional)</label>
        <input type="text" id="new-amount" placeholder="Ej: 228€">
      </div>
      <div class="form-actions">
        <button class="btn-cancel" onclick="closeAddModal()">Cancelar</button>
        <button class="btn-save" onclick="saveNewTask()">Guardar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAddModal();
  });
}

// --- ACTIONS ---
function setTab(tab) {
  activeTab = tab;
  render();
}

function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.status = t.status === 'done' ? 'pending' : 'done';
    saveData();
    render();
  }
}

function toggleAlarmPanel() {
  alarmPanelOpen = !alarmPanelOpen;
  render();
}

function updateSetting(key, value) {
  settings[key] = value;
  saveData();
}

function testAlarm() {
  const urgentTask = tasks.filter(t => t.status === 'pending').sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  if (urgentTask) startAlarm(urgentTask);
}

function openAddModal() {
  renderAddModal();
}

function closeAddModal() {
  const modal = document.getElementById('add-modal');
  if (modal) modal.remove();
}

function saveNewTask() {
  const title = document.getElementById('new-title').value.trim();
  const desc = document.getElementById('new-desc').value.trim();
  const date = document.getElementById('new-date').value;
  const type = document.getElementById('new-type').value;
  const amount = document.getElementById('new-amount').value.trim();

  if (!title || !date) {
    alert('Rellena al menos el título y la fecha');
    return;
  }

  tasks.push({
    id: nextId(),
    title,
    desc,
    date,
    type,
    status: 'pending',
    amount,
    alerts: { d5: false, d1: false, d0: false }
  });

  saveData();
  closeAddModal();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveData();
  render();
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
    deferredPrompt.userChoice.then((choice) => {
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
      console.log('Service Worker registrado:', reg.scope);

      // Request periodic sync for background alarm checks
      if ('periodicSync' in reg) {
        try {
          await reg.periodicSync.register('check-deadlines', { minInterval: 3600000 });
        } catch (e) {
          console.log('Periodic sync no disponible:', e);
        }
      }
    } catch (e) {
      console.error('Error registrando SW:', e);
    }
  }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  render();
  registerSW();
  requestNotificationPermission();
  scheduleLocalAlarmCheck();

  // Check for tasks that need immediate attention on open
  const pending = tasks.filter(t => t.status === 'pending');
  const overdue = pending.filter(t => daysUntil(t.date) < 0);
  if (overdue.length > 0 && settings.soundEnabled) {
    // Alert on first overdue task when app opens
    setTimeout(() => startAlarm(overdue[0]), 1500);
  }
});
