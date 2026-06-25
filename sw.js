// SW v11 — SIN CACHE, siempre red. Solo gestiona push notifications.
const CACHE_NAME = 'innomotor-agenda-v11';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Borrar TODAS las cachés
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

// SIN caché — todo va a la red siempre
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

// Firebase para push con app cerrada
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
