import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const publicVapidKey = (import.meta as any).env.VITE_VAPID_PUBLIC_KEY;

export function usePushNotifications() {
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        if (isSignedIn && 'serviceWorker' in navigator && 'PushManager' in window && publicVapidKey) {
            registerServiceWorkerAndSubscribe();
        }
    }, [isSignedIn]);

    function urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    const registerServiceWorkerAndSubscribe = async () => {
        try {
            // 1. Register Service Worker
            const register = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            // 2. Register Push
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
            // 3. Send Push to Backend
            const token = await getToken();
            await fetch('http://localhost:3000/api/notifications/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (err) {
            console.error('Service Worker/Push Setup Error:', err);
        }
    }
}
