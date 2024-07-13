import { browser } from "$app/environment";
import { initializeApp, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import type { Auth } from "firebase/auth";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

export let app: FirebaseApp
export let auth: Auth

export const initializeFirebase = () => {
    if (!browser) {
        throw new Error('Firebase can only be initialized in the browser');
    }
    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);

        if (firebaseConfig.useEmulator) {
            connectAuthEmulator(auth, 'http://localhost:9099');
        }
    }
};