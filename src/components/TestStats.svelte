<script lang="ts">
    import { onDestroy } from "svelte";
    import { game } from "$lib/stores"; // Adjust the import path as necessary


    let localgameStats = {
        wordCount: 0,
        charCount: 0,
        wordsPerMinute: 0,
        accuracy: 0,
    };

    const unsubscribe = game.subscribe((value) => {
            // localgameStats = value.settings;
        });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="test-gameStats">
    <div class="gameStats-buttons">
        <button class="selected">wpm</button>
        <button title="{($game.calculateWPM() ? $game.calculateWPM() : 0).toFixed(2)} wpm">{($game.calculateWPM() ? $game.calculateWPM() : 0).toFixed()}</button>
        <button class="selected">acc</button>
        <button title="{$game.calculateAccuracy().toFixed(2)}%">{$game.calculateAccuracy().toFixed()}%</button>
        <button class="selected">gwpm</button>
        <button title="{($game.calculateGlobalAccuracy() ? $game.calculateGlobalAccuracy() : 0).toFixed(2)} wpm">{($game.calculateGlobalAccuracy() ? $game.calculateGlobalAccuracy() : 0).toFixed()}</button>
        <button class="selected">gacc</button>
        <button title="{$game.calculateGlobalAccuracy().toFixed(2)}%">{$game.calculateGlobalAccuracy().toFixed()}%</button>

        

    </div>
    <div class="divider"></div>
    <div class="count-buttons">
        <button class="selected">wc</button>
        <button>{$game.word_count}</button>
        <button class="selected">cc</button>
        <button>{$game.letter_count}</button>
    </div>
</div>

<style>
    .test-gameStats {
        position: absolute;
        bottom: 15%;
        left: 50%;
        height: 30px;
        transform: translateX(-50%);
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
        border-radius: 8px;
    }
    .gameStats-buttons {
        display: flex;
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 5px;
        gap: 0px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        overflow: hidden;
        border: 1 px solid #333;
    }

    .count-buttons {
        display: flex;
        gap: 0px;
        font-size: 14px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        border: 1 px solid #333;
    }
    button {
        display: inline-flex;
        height: 25px;
        background-color: #333;
        color: var(--gray); /* Grey text */
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
        border: none;
        cursor: pointer;
    }
    .selected {
        color: var(--yellow); /* Yellow text */
    }

    .divider {
        background-color: var(--gray); /* Grey line */
    }

    /* Additional styles for button hover effect (optional) */
    button:hover {
        background-color: #444;
    }
    .divider {
        height: 20px;
        width: 2px;
        background-color: #333;
        margin: 0 20px;
    }
</style>
