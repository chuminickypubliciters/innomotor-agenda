// Netlify Function: check-alarms (scheduled cada minuto)
// Usa Firebase Admin SDK V1 para mandar push aunque la app esté cerrada

const FIREBASE_PROJECT = 'chuminicky-dwall';
const CLIENT_EMAIL = 'firebase-adminsdk-fbsvc@chuminicky-dwall.iam.gserviceaccount.com';

// Alarmas programadas por hora exacta (sincronizar con SCHEDULED_ALARMS de app.js)
const SCHEDULED_ALARMS = [
  {
    id: "test-alarm-prueba",
    title: "🔔 PRUEBA PUSH — INNOMOTOR",
    desc: "Las notificaciones push funcionan con la app cerrada. Sistema operativo.",
    time: "12:55",
    date: "2026-06-25"
  }
];

// Plazos fiscales (sincronizar con DEFAULT_TASKS de app.js)
const DEADLINE_TASKS = [
  { id: 1,  title: "Modelo 303 — IVA Q2/2026",           date: "2026-07-20", amount: "0€" },
  { id: 2,  title: "Modelo 130 — IRPF Q2/2026",           date: "2026-07-20", amount: "0€" },
  { id: 3,  title: "Modelo 115 — Retención alquiler Q2",  date: "2026-07-20", amount: "228€" },
  { id: 4,  title: "Revisar cobro nómina Alemania",        date: "2026-07-15", amount: "~2.650€" },
  { id: 5,  title: "Acción legal Alemania si no cobra",    date: "2026-07-20", amount: "" },
  { id: 6,  title: "Contactar Corinna Fischer — EURES",    date: "2026-07-10", amount: "" },
  { id: 7,  title: "Factura alquiler — rectificar",        date: "2026-07-31", amount: "" },
];

// ─── JWT para autenticar con Google OAuth2 ───
async function getAccessToken(privateKeyPem) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  // Crear JWT manualmente (sin librerías externas)
  const header = { alg: 'RS256', typ: 'JWT' };
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const signingInput = `${b64(header)}.${b64(payload)}`;

  // Importar clave privada
  const keyData = privateKeyPem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');
  const binaryKey = Buffer.from(keyData, 'base64');
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(signingInput)
  );
  const jwt = `${signingInput}.${Buffer.from(signature).toString('base64url')}`;

  // Intercambiar JWT por access token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('No access_token: ' + JSON.stringify(data));
  return data.access_token;
}

// ─── Enviar notificación push via FCM V1 ───
async function sendPush(token, title, body, accessToken) {
  const res = await fetch(
    `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT}/messages:send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        message: {
          token,
          notification: { title, body },
          android: { priority: 'high' },
          apns: { headers: { 'apns-priority': '10' } },
          webpush: {
            notification: {
              title, body,
              icon: '/icons/icon-192.png',
              requireInteraction: true,
              vibrate: [300, 100, 300, 100, 300]
            }
          }
        }
      })
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

// ─── HANDLER PRINCIPAL ───
exports.handler = async () => {
  // Hora España (UTC+2 verano)
  const now = new Date();
  const spainNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const todayStr = spainNow.toISOString().split('T')[0];
  const currentTime = spainNow.getUTCHours().toString().padStart(2,'0') + ':' + spainNow.getUTCMinutes().toString().padStart(2,'0');

  console.log(`check-alarms: ${todayStr} ${currentTime} hora España`);

  // Obtener token FCM del dispositivo
  const { getStore } = require('@netlify/blobs');
  let fcmToken;
  try {
    const store = getStore('fcm-tokens');
    fcmToken = await store.get('innomotor-pablo');
  } catch (e) {
    console.error('Error obteniendo token FCM:', e.message);
    return { statusCode: 200, body: 'Sin token guardado aún' };
  }

  if (!fcmToken) {
    console.log('Sin token FCM — abre la app para registrarla');
    return { statusCode: 200, body: 'Sin token' };
  }

  // Recopilar notificaciones a enviar
  const toSend = [];

  // 1. Alarmas por hora exacta
  for (const alarm of SCHEDULED_ALARMS) {
    if (alarm.date === todayStr && alarm.time === currentTime) {
      toSend.push({ title: alarm.title, body: alarm.desc });
    }
  }

  // 2. Plazos fiscales — solo a las 09:00
  if (currentTime === '09:00') {
    for (const task of DEADLINE_TASKS) {
      const diffDays = Math.round(
        (new Date(task.date + 'T00:00:00Z') - new Date(todayStr + 'T00:00:00Z'))
        / 86400000
      );
      const suffix = task.amount ? ` — ${task.amount}` : '';
      if (diffDays === 5)      toSend.push({ title: '⚠️ Vence en 5 días',  body: task.title + suffix });
      else if (diffDays === 1) toSend.push({ title: '🔴 ¡VENCE MAÑANA!',  body: task.title + suffix });
      else if (diffDays === 0) toSend.push({ title: '🚨 ¡VENCE HOY!',     body: task.title + suffix });
    }
  }

  if (toSend.length === 0) {
    console.log('Sin alarmas este minuto');
    return { statusCode: 200, body: 'Sin alarmas' };
  }

  // Obtener access token OAuth2
  const privateKey = process.env.FCM_PRIVATE_KEY.replace(/\\n/g, '\n');
  let accessToken;
  try {
    accessToken = await getAccessToken(privateKey);
  } catch (e) {
    console.error('Error obteniendo access token:', e.message);
    return { statusCode: 500, body: 'Error auth: ' + e.message };
  }

  // Enviar notificaciones
  const results = [];
  for (const n of toSend) {
    try {
      const r = await sendPush(fcmToken, n.title, n.body, accessToken);
      console.log('Push enviado:', n.title, r.name);
      results.push({ ok: true, title: n.title });
    } catch (e) {
      console.error('Error enviando push:', e.message);
      results.push({ ok: false, error: e.message });
    }
  }

  return { statusCode: 200, body: JSON.stringify({ sent: results.length, results }) };
};
