<script lang="ts">

    import { game } from "$lib/stores";
    // import { startGame } from "./Test.svelte";
    let showLanguageModal = false;

    async function onLanguageSelect(language: string) {
        $game.language = language;
        $game.reset();
        showLanguageModal = false;
    }

</script>

<style>
    #language-select-modal {
        /* display: none; */
        position: absolute;
        top: 50%;
        left: 65%;
        width: 200px;
        height: 220px;
        background-color: var(--backround-color);
        border: 1px solid var(--main-color);
        border-radius: 8px;
        z-index: 100;
    }
    #language-select {
        color: var(--text-color-bright);
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
<!-- <svelte:window on:click={() => {if (showLanguageModal) showLanguageModal = false}} /> -->
<button id="language-select" on:click={() => showLanguageModal=!showLanguageModal}>
    <i class="fa-solid fa-code"></i>
    {$game.language}
</button>
{#if showLanguageModal}
<div id="language-select-modal">
        <button class="select-button"
            on:click={() => onLanguageSelect("javascript")}
            class:selected={$game.language === "javascript"}>javascript</button
        >
        <button class="select-button"
        on:click={() => onLanguageSelect("typescript")}
            class:selected={$game.language === "typescript"}>typescript</button
        >
        <button class="select-button"
        on:click={() => onLanguageSelect("python")}
            class:selected={$game.language === "python"}>python</button
        >
        <button class="select-button"
        on:click={() => onLanguageSelect("golang")}
            class:selected={$game.language === "golang"}>golang</button
        >
        <button class="select-button"
        on:click={() => onLanguageSelect("bash")}
            class:selected={$game.language === "bash"}>bash</button
        >
</div>
{/if}