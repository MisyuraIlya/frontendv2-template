/* service-worker.js */
self.addEventListener('push', event => {
    if (!event.data) return;
    const { title, message } = event.data.json();
    event.waitUntil(
      self.registration.showNotification(title, {
        body: message,
        icon: '/icons/icon-192x192.png',
        tag: 'general-push',
      })
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/')  // or some URL from payload
    );
  });
  