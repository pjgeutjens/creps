<script lang="ts">

    import { gameSettings } from "$lib/stores";
    // import { startGame } from "./Test.svelte";
    let showLanguageModel = false;

    async function onLanguageChange() {
    //     await startGame();
    }

</script>

<style>
    #language-select-modal {
        /* display: none; */
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 220px;
        background-color: var(--backround-color);
        border: 1px solid var(--yellow);
        border-radius: 8px;
        z-index: 100;
    }
    .select-button {
        background-color: var(--yellow);
        color: #333;
        border: none;
        width: 97%;
        border-radius: 8px;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
    }
</style>
<button id="language-select" on:click={() => showLanguageModel=true}>
    <i class="fa-solid fa-code"></i>
    {$gameSettings.language}
</button>
{#if showLanguageModel}
<div id="language-select-modal">
        <button class="select-button"
            on:click={() => {$gameSettings.language = "javascript"; showLanguageModel = false}}
            class:selected={$gameSettings.language === "javascript"}>javascript</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.language = "typescript"; showLanguageModel = false}}
            class:selected={$gameSettings.language === "typescript"}>typescript</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.language = "python"; showLanguageModel = false}}
            class:selected={$gameSettings.language === "python"}>python</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.language = "golang"; showLanguageModel = false}}
            class:selected={$gameSettings.language === "golang"}>golang</button
        >
        <button class="select-button"
        on:click={() => {$gameSettings.language = "bash"; showLanguageModel = false}}
            class:selected={$gameSettings.language === "bash"}>bash</button
        >
</div>
{/if}