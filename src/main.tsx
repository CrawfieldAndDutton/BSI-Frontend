import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
// src/util/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
  measurementId: import.meta.env.VITE_FIREBASE_measurementId,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

// Foreground notifications
onMessage(messaging, (payload) => {
  toast(payload.notification?.body || "New Notification");

  if (payload.notification?.title === "Inquiry booked!") {
    // Do something when inquiry is booked
  }
});

// Ask for permission & get token
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    getToken(messaging, {
      vapidKey: "BHIdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    })
      .then(async (currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
          // await UserSetters.updateFcmToken({ fcmToken: currentToken });
        } else {
          console.warn("No registration token available.");
        }
      })
      .catch((err) => {
        console.error("Error retrieving token:", err);
      });
  } else {
    console.warn("Notifications permission denied");
  }
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
