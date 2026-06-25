const CACHE_NAME = 'innomotor-agenda-v6';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install — cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Push notification received
self.addEventListener('push', (event) => {
  let data = { title: 'INNOMOTOR Agenda', body: 'Tienes un plazo fiscal pendiente' };
  if (event.data) {
    try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [300, 100, 300, 100, 300],
      requireInteraction: true,
      tag: data.tag || 'innomotor-alarm',
      renotify: true,
      actions: [
        { action: 'confirm', title: 'ENTERADO' },
        { action: 'snooze', title: 'Recordar en 1h' }
      ]
    })
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'snooze') {
    // Re-notify in 1 hour
    setTimeout(() => {
      self.registration.showNotification('INNOMOTOR Agenda', {
        body: event.notification.body,
        icon: '/icons/icon-192.png',
        vibrate: [300, 100, 300, 100, 300],
        requireInteraction: true,
        tag: 'innomotor-alarm-snooze',
        renotify: true
      });
    }, 3600000);
  } else {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        if (clients.length > 0) {
          clients[0].focus();
        } else {
          self.clients.openWindow('/');
        }
      })
    );
  }
});

// Periodic background sync for alarm checks
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-deadlines') {
    event.waitUntil(checkDeadlines());
  }
});

async function checkDeadlines() {
  const clients = await self.clients.matchAll();
  if (clients.length > 0) {
    clients[0].postMessage({ type: 'CHECK_DEADLINES' });
  }
}
