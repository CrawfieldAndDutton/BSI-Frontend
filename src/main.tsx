import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyAezFN6M6DMRaGvX7gyHDntlokuoJCyIew",
  authDomain: "notifications-d9581.firebaseapp.com",
  projectId: "notifications-d9581",
  storageBucket: "notifications-d9581.firebasestorage.app",
  messagingSenderId: "907676436781",
  appId: "1:907676436781:web:17b49a73c34043b4cc6ba4",
  measurementId: "G-SMFRF9CC0D",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

// Ask Notification Permission & Get Token
async function requestPermissionAndToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");

      const token = await getToken(messaging, {
        vapidKey:
          "BF2Qcw4ICrAt2D4Vi3_EUfJNxd-lns-_UoRR2tXgn8GyB1lO4ZPauHRBZJRybPWtoSIGIQGzczAmL9S3OdjbFOQ",
      });

      if (token) {
        console.log("FCM Token:", token);

        // Send this token to your backend to store it for later use
      } else {
        console.warn("No registration token available.");
      }
    } else {
      console.warn("Notification permission denied.");
    }
  } catch (err) {
    console.error("Error retrieving token:", err);
  }
}

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  toast.success(payload.notification?.title || "New Notification");
});

// Run function
requestPermissionAndToken();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
