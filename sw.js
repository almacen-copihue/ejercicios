const CACHE = 'micromove-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Notificación programada vía mensaje
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE') {
    const { delayMs, exercise } = e.data;
    setTimeout(() => {
      self.registration.showNotification('MicroMove 💪', {
        body: `${exercise.emoji} ${exercise.name} — ${exercise.desc}`,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'micromove-reminder',
        renotify: true,
        vibrate: [200, 100, 200],
        actions: [{ action: 'ok', title: '✅ Hecho!' }]
      });
    }, delayMs);
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(list => {
    if (list.length > 0) return list[0].focus();
    return clients.openWindow('/');
  }));
});
