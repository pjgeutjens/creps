<script lang="ts">

    import { gameSettings } from "$lib/stores";
    // import { startGame } from "./Test.svelte";
    let showThemeModal = false;

    async function onThemeChange() {
    //     await startGame();
    }

</script>

<style>
    #theme-select-modal {
        /* display: none; */
        position: absolute;
        top: 50%;
        left: 65%;
        width: 200px;
        height: 180px;
        background-color: var(--backround-color);
        border: 1px solid var(--main-color);
        border-radius: 8px;
        z-index: 100;
    }
    #theme-select {
        color: var(--text-color-bright);
        position:absolute;
        bottom: 50px;
        right: 25%;
    }
    .select-button {
        background-color: var(--main-color);
        color: var(--text-color-dark);
        border: none;
        width: 97%;
        border-radius: 8px;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
    }
</style>
<!-- <svelte:window on:click={() => {if (showThemeModal) showThemeModal = false}} /> -->
<button id="theme-select" on:click={() => showThemeModal=!showThemeModal}>
    <i class="fa-solid fa-palette"></i>
    {$gameSettings.theme}
</button>
{#if showThemeModal}
<div id="theme-select-modal">
        <button class="select-button"
            on:click={() => { $gameSettings.theme = "nord"; showThemeModal = false}}
            class:selected={$gameSettings.theme === "nord"}>nord</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.theme = "monkey"; showThemeModal = false}}
            class:selected={$gameSettings.theme === "monkey"}>monkey</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.theme = "nord_light"; showThemeModal = false}}
            class:selected={$gameSettings.theme === "nord_light"}>nord_light</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.theme = "monkey_light"; showThemeModal = false}}
            class:selected={$gameSettings.theme === "monkey_light"}>monkey_light</button
        >
</div>
{/if}