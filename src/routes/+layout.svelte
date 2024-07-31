<script lang="ts">
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import "../app.css";
    import type { LayoutData } from "./$types";
    import { session } from "$lib/session";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import type { Game } from "$lib/game";
    import ThemeSelect from "../components/ThemeSelect.svelte";
    
    export let data: LayoutData;

    let loading: boolean = true;
    let loggedIn: boolean = false;

    let game: Game;

    session.subscribe((cur: any) => {
        loading = cur?.loading;
        loggedIn = cur?.loggedIn;
    });

    onMount(async () => {
        const user: any = await data.getAuthUser();
        const loggedIn = !!user && user?.emailVerified;
        session.update((cur: any) => {
            loading = false;
            return { ...cur, user, loggedIn, loading: false };
        });

        if (loggedIn) {
            goto("/");
        }
    });
</script>

{#if loading}
    <div>Loading...</div>
{:else}
    <div class="app-container">
        <header>
            <!-- <Header /> -->
        </header>
        <main>
            Logged in: {loggedIn}
            <slot></slot>
            <!-- Main content will be injected here -->
        </main>
        <footer>

        </footer>
    </div>
{/if}

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: var(--dark-background);
        color: var(--text-color);
             }
</style>
