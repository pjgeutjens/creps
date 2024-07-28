<script lang="ts">

    import { game } from "$lib/stores";
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
<button id="language-select" on:click={() => showLanguageModel=true}>
    <i class="fa-solid fa-code"></i>
    {$game.language}
</button>
{#if showLanguageModel}
<div id="language-select-modal">
        <button class="select-button"
            on:click={() => { $game.language = "javascript"; $game.reset(); showLanguageModel = false}}
            class:selected={$game.language === "javascript"}>javascript</button
        >
        <button class="select-button"
        on:click={() => {console.log($game);$game.language = "typescript"; $game.reset(); showLanguageModel = false}}
            class:selected={$game.language === "typescript"}>typescript</button
        >
        <button class="select-button"
        on:click={() => {$game.language = "python"; $game.reset(); showLanguageModel = false}}
            class:selected={$game.language === "python"}>python</button
        >
        <button class="select-button"
        on:click={() => {$game.language = "golang"; $game.reset(); showLanguageModel = false}}
            class:selected={$game.language === "golang"}>golang</button
        >
        <button class="select-button"
        on:click={() => {$game.language = "bash"; $game.reset(); showLanguageModel = false}}
            class:selected={$game.language === "bash"}>bash</button
        >
</div>
{/if}