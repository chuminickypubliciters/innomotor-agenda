// Netlify Function: check-alarms (scheduled)
// Se ejecuta cada minuto via cron, comprueba alarmas y manda push FCM
// Configurado en netlify.toml como scheduled function

const { getStore } = require('@netlify/blobs');

// ─── ALARMAS PROGRAMADAS (mismas que en app.js SCHEDULED_ALARMS) ───
// Actualizar aquí cuando se añadan/quiten alarmas en la app
const SCHEDULED_ALARMS = [
  {
    id: "test-alarm-prueba",
    title: "🔔 PRUEBA PUSH — INNOMOTOR",
    desc: "Las notificaciones push funcionan con la app cerrada. Sistema operativo.",
    time: "12:55",
    date: "2026-06-25"
  }
];

// ─── ALARMAS DE PLAZOS (días antes del vencimiento) ───
const DEADLINE_TASKS = [
  { id: 1,  title: "Modelo 303 — IVA Q2/2026",          date: "2026-07-20", amount: "0€" },
  { id: 2,  title: "Modelo 130 — IRPF Q2/2026",          date: "2026-07-20", amount: "0€" },
  { id: 3,  title: "Modelo 115 — Retención alquiler Q2", date: "2026-07-20", amount: "228€" },
  { id: 4,  title: "Revisar cobro nómina Alemania",       date: "2026-07-15", amount: "~2.650€" },
  { id: 5,  title: "Acción legal Alemania si no cobra",   date: "2026-07-20", amount: "" },
  { id: 6,  title: "Contactar Corinna Fischer — EURES",   date: "2026-07-10", amount: "" },
  { id: 7,  title: "Factura alquiler — rectificar",       date: "2026-07-31", amount: "" },
];

exports.handler = async () => {
  const now = new Date();
  // Ajustar a hora España (UTC+2 en verano)
  const spainOffset = 2 * 60 * 60 * 1000;
  const spainNow = new Date(now.getTime() + spainOffset);

  const todayStr = spainNow.toISOString().split('T')[0];
  const currentTime = spainNow.getUTCHours().toString().padStart(2,'0') + ':' + spainNow.getUTCMinutes().toString().padStart(2,'0');

  console.log(`check-alarms ejecutado: ${todayStr} ${currentTime} (hora España)`);

  // Obtener token FCM guardado
  let fcmToken;
  try {
    const store = getStore('fcm-tokens');
    fcmToken = await store.get('innomotor-pablo');
  } catch (e) {
    console.error('Error obteniendo token:', e);
    return { statusCode: 500, body: 'Error obteniendo token' };
  }

  if (!fcmToken) {
    console.log('No hay token FCM guardado aún');
    return { statusCode: 200, body: 'Sin token' };
  }

  const notificationsToSend = [];

  // 1. Comprobar alarmas programadas por hora exacta
  for (const alarm of SCHEDULED_ALARMS) {
    if (alarm.date === todayStr && alarm.time === currentTime) {
      notificationsToSend.push({
        title: alarm.title,
        body: alarm.desc
      });
    }
  }

  // 2. Comprobar plazos próximos (5 días, 1 día, hoy)
  for (const task of DEADLINE_TASKS) {
    const taskDate = new Date(task.date + 'T00:00:00Z');
    const diffMs = taskDate - new Date(todayStr + 'T00:00:00Z');
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Solo notificar a las 09:00 hora España
    if (currentTime !== '09:00') continue;

    if (diffDays === 5) {
      notificationsToSend.push({
        title: `⚠️ Vence en 5 días`,
        body: `${task.title}${task.amount ? ' — ' + task.amount : ''}`
      });
    } else if (diffDays === 1) {
      notificationsToSend.push({
        title: `🔴 ¡VENCE MAÑANA!`,
        body: `${task.title}${task.amount ? ' — ' + task.amount : ''}`
      });
    } else if (diffDays === 0) {
      notificationsToSend.push({
        title: `🚨 ¡VENCE HOY!`,
        body: `${task.title}${task.amount ? ' — ' + task.amount : ''}`
      });
    }
  }

  if (notificationsToSend.length === 0) {
    console.log('Sin alarmas para este minuto');
    return { statusCode: 200, body: 'Sin alarmas' };
  }

  // Enviar push FCM via API REST de Firebase
  const serverKey = process.env.FCM_SERVER_KEY;
  if (!serverKey) {
    console.error('FCM_SERVER_KEY no configurada en variables de entorno');
    return { statusCode: 500, body: 'FCM_SERVER_KEY no configurada' };
  }

  const results = [];
  for (const notif of notificationsToSend) {
    try {
      const res = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${serverKey}`
        },
        body: JSON.stringify({
          to: fcmToken,
          notification: {
            title: notif.title,
            body: notif.body,
            icon: '/icons/icon-192.png'
          },
          android: { priority: 'high' },
          apns: { headers: { 'apns-priority': '10' } }
        })
      });
      const data = await res.json();
      console.log('FCM enviado:', notif.title, data);
      results.push({ ok: true, title: notif.title });
    } catch (e) {
      console.error('Error enviando FCM:', e);
      results.push({ ok: false, error: e.message });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ sent: results.length, results })
  };
};
