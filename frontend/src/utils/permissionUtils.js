/**
 * Permission Utilities for EventPulse AI
 * Handles Geolocation and Push Notification permissions
 */

export const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by this browser.");
        return null;
    }

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
        console.log("Location permission granted:", position);
        return position;
    } catch (error) {
        console.error("Error getting location:", error);
        return null;
    }
};

export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        console.warn("This browser does not support desktop notifications.");
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification("EventPulse AI", {
                body: "Neural notifications activated. You will receive real-time safety alerts.",
                icon: "/favicon.ico" // Using standard favicon instead of missing logo
            });
            return true;
        }
    }
    return false;
};

export const checkPermissions = async () => {
    const results = {
        location: false,
        notifications: false
    };

    if ("permissions" in navigator) {
        try {
            const locStatus = await navigator.permissions.query({ name: 'geolocation' });
            results.location = locStatus.state === 'granted';

            const notifStatus = await navigator.permissions.query({ name: 'notifications' });
            results.notifications = notifStatus.state === 'granted';
        } catch (e) {
            console.error("Error checking permissions:", e);
        }
    }

    return results;
};
