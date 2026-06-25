const CACHE_NAME = 'innomotor-agenda-v10';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  // Tomar control inmediatamente sin esperar
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Borrar TODAS las cachés antiguas
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => {
        console.log('Borrando caché:', k);
        return caches.delete(k);
      }))
    ).then(() => {
      // Tomar control de todos los clientes abiertos
      return self.clients.claim();
    }).then(() => {
      // Forzar recarga en todos los clientes
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      clients.forEach(client => client.navigate(client.url));
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Network first — siempre intentar red antes de caché
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});

// Firebase Messaging para push con app cerrada
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBrjuaAOcbXdf6AYIs1zkE32QO9PcJ2qG4",
  authDomain: "chuminicky-dwall.firebaseapp.com",
  projectId: "chuminicky-dwall",
  storageBucket: "chuminicky-dwall.firebasestorage.app",
  messagingSenderId: "792658008584",
  appId: "1:792658008584:web:304562a3970e2095eb0fbd"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '🔔 INNOMOTOR Agenda';
  const body = payload.notification?.body || 'Tienes un plazo fiscal pendiente';
  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [300, 100, 300, 100, 300],
    requireInteraction: true,
    tag: 'innomotor-alarm',
    renotify: true,
    actions: [
      { action: 'confirm', title: '✅ ENTERADO' },
      { action: 'snooze', title: '⏰ Recordar en 1h' }
    ]
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) clients[0].focus();
      else self.clients.openWindow('/');
    })
  );
});
