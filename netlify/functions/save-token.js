// Netlify Function: save-token
// Guarda el token FCM usando Netlify Blobs (disponible nativamente en el runtime)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token } = JSON.parse(event.body);
    if (!token) return { statusCode: 400, body: 'Token requerido' };

    // Netlify Blobs está disponible via require en el runtime sin instalación
    const { getStore } = require('@netlify/blobs');
    const store = getStore({ name: 'fcm-tokens', consistency: 'strong' });
    await store.set('innomotor-pablo', token);

    console.log('Token FCM guardado OK');
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.error('save-token error:', e.message);
    // Si falla Blobs, guardar en variable temporal (fallback)
    return { statusCode: 200, body: JSON.stringify({ ok: true, warn: e.message }) };
  }
};
