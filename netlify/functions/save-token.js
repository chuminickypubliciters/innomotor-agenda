// Netlify Function: save-token
// Guarda el token FCM del dispositivo en un archivo en Netlify Blobs
// para que check-alarms pueda enviarlo notificaciones push

const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token } = JSON.parse(event.body);
    if (!token) return { statusCode: 400, body: 'Token requerido' };

    const store = getStore('fcm-tokens');
    // Guardamos el token con clave "innomotor-pablo" (un solo dispositivo)
    await store.set('innomotor-pablo', token);

    console.log('Token FCM guardado:', token.substring(0, 20) + '...');
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (e) {
    console.error('save-token error:', e);
    return { statusCode: 500, body: e.message };
  }
};
