<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/firebase.client";
    import { session } from "$lib/session";
    import { signInWithEmailAndPassword, signInWithPopup, type UserCredential } from "firebase/auth";
    import { GoogleAuthProvider } from "firebase/auth/web-extension";

    let email: string = "";
    let password: string = "";

    async function loginWithMail() {
        await signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            const { user }: UserCredential = result;
            session.set({
                loggedIn: true,
                user: {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    uid: user?.uid,
                }
            });
            goto("/");
        })
        .catch((err) => {
            return err
        });
    }

    async function loginWithGoogle() {
        console.log("Logging in with Google");
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
        .then((result) => {
            const { displayName, email, photoURL, uid } = result?.user;
            session.set({
                loggedIn: true,
                user: {
                    displayName,
                    email,
                    photoURL,
                    uid,
                }
            });

            goto("/");
        }).catch((err) => {
            return err
        });
    }
</script>

<div class="login-form">
    <h1>Login</h1>
    <form on:submit={loginWithMail}>
        <input bind:value={email} type="text" placeholder="Email" />
        <input bind:value={password} type="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>

    <div>or</div>

    <button on:click={loginWithGoogle}>Login with Google</button>
    <div>Don't you have an account? <a href="/register"> Register</a></div>
</div>
