<script>
    import { game, gameSettings } from "$lib/stores";
    import { get } from 'svelte/store'

    function setRandomTheme() {
        const themes = ["nord", "nord_light", "monkey", "monkey_light"].filter((theme) => theme !== $gameSettings.theme);
        const currentSettings = get(gameSettings)
        const randomIndex = Math.floor(Math.random() * themes.length);
        const newSettings = {...currentSettings, theme: themes[randomIndex]}
        gameSettings.update(() => newSettings);
    }

        
</script>

<style>
    .test-config {
        position: absolute;
        top: 10%;
        left: 50%;
        height: 30px;
        transform: translateX(-50%);
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--text-color-dark);
        border-radius: 8px;
    }

    .duration-buttons {
        display: flex;
        gap: 0px;
        font-size: 14px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        border: 1 px solid var(--text-color-dark);
    }
    button {
        display: inline-flex;
        height: 25px;
        background-color: var(--text-color-dark);
        color: var(--text-color-subdued); /* Grey text */
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
        border: none;
        cursor: pointer;
        &:hover {
            color: var(--text-color);
        }

        &.selected {
            color: var(--main-color); /* Yellow text */
        }
    }

    .infinity {
        position:relative;
        bottom: 2px;
        font-size: 18px;
    }

    .divider {
        background-color: var(--text-color-subdued); /* Grey line */
    }

    /* Additional styles for button hover effect (optional) */
    button:hover {
        background-color: #444;
    }
    .divider {
        height: 20px;
        width: 2px;
        background-color: var(--text-color-dark);
        margin: 0 20px;
    }
</style>


<div class="test-config">
    <!-- <div class="language-buttons">
        <button
            on:click={() => ($game.language = "javascript")}
            class:selected={$game.language === "javascript"}>javascript</button
        >
        <button
            on:click={() => ($game.language = "typescript")}
            class:selected={$game.language === "typescript"}>typescript</button
        >
        <button
            on:click={() => ($game.language = "python")}
            class:selected={$game.language === "python"}>python</button
        >
        <button
            on:click={() => ($game.language = "golang")}
            class:selected={$game.language === "golang"}>golang</button
        >
        <button
            on:click={() => ($game.language = "bash")}
            class:selected={$game.language === "bash"}>bash</button
        >
    </div> -->
    <div class="divider"></div>
    <div class="duration-buttons">
        <button
            on:click={() => {$game.duration = 30; $gameSettings.duration = 30}}
            class:selected={$game.duration === 30}>30</button
        >
        <button
            on:click={() => {$game.duration = 60; $gameSettings.duration = 60}}
            class:selected={$game.duration === 60}>60</button
        >
        <button
            on:click={() => {$game.duration = 120; $gameSettings.duration = 120}}
            class:selected={$game.duration === 120}>120</button
        >
        <button
            on:click={() => {$game.duration = 0; $gameSettings.duration = 0}}
            class:selected={$game.duration === 0} class="infinity">∞</button
        >
        <!-- <button on:click={() => setRandomTheme()}>{$gameSettings.theme}</button> -->
    </div>
</div>