const CACHE_NAME = 'innomotor-agenda-v9';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// ─── FIREBASE MESSAGING (push cuando app cerrada) ───
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

// Push en background (app cerrada o en segundo plano)
messaging.onBackgroundMessage((payload) => {
  console.log('INNOMOTOR push background:', payload);
  const title = payload.notification?.title || '🔔 INNOMOTOR Agenda';
  const body = payload.notification?.body || 'Tienes un plazo fiscal pendiente';
  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [300, 100, 300, 100, 300, 100, 300],
    requireInteraction: true,
    tag: 'innomotor-alarm',
    renotify: true,
    actions: [
      { action: 'confirm', title: '✅ ENTERADO' },
      { action: 'snooze', title: '⏰ Recordar en 1h' }
    ]
  });
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'snooze') {
    // No hacemos nada — el backend mandará otro push en 1h si se implementa
    return;
  }
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    })
  );
});
