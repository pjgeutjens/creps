import { browser } from '$app/environment';
import { initializeFirebase, auth } from '$lib/firebase.client.js';
import { onAuthStateChanged } from 'firebase/auth';

export async function load({ url }) {
    if (browser) {
        try {
            initializeFirebase();
        } catch (e) {
            console.error(e);
        }
    }

    function getAuthUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => resolve(user ? user : false));
        });
    }

    return {
        getAuthUser: getAuthUser,
        url: url.pathname
    };
}