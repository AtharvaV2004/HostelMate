console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Received...", data);

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/icon.png" // placeholder for an app icon
    });
});

self.addEventListener("notificationclick", event => {
    event.notification.close();
    // Focus or open the app window
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
