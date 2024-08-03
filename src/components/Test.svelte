<script lang="ts">
    import { alphabet } from "$lib/alphabet";
    import { CharacterState, Game } from "$lib/game";
    import { game, get_at, get_current, get_next } from "$lib/stores";
    import { letterToHtml } from "$lib/utils";
    import { onDestroy } from "svelte";
    import LanguageSelect from "./LanguageSelect.svelte";

    import StartGameOverlay from "./StartGameOverlay.svelte";
    import Timer from "./Timer.svelte";
    import { get } from "svelte/store";

    let timerRunning = false;
    let timer: NodeJS.Timeout;

    let unsubscribe = game.subscribe((currentValue) => {
        if (currentValue.language === $game.language && currentValue.gameMode === $game.gameMode) {
            return;
        }
        console.log("Game changed", currentValue);
        startGame();
    });

    onDestroy(() => {
        unsubscribe();
    });

    function startGame() {
        timerRunning = false;
        if (timer) {
            clearInterval(timer);
        }
        $game.start();
        $game.state = "active";
    }

    function endGame() {
        // gameActive = false;
        $game.end()
    }

    function checkTimer() {
        if (!timerRunning) {
            timerRunning = true;
            timer = setInterval(() => {
                // TODO: Fix this randomness with the countdown timer for infinity
                $game.testTimeElapsed++;
                $game.totalTimeElapsed++;
                if ($game.duration > 0) {
                    if ($game.totalTimeElapsed >= $game.duration) {
                        clearInterval(timer);
                        endGame();
                    }
                }
            }, 1000);
        }
    }
    function onkeydown(e: KeyboardEvent) {
        checkTimer();
        $game.handleKeydown(e);
        $game.language = $game.language;
    }
</script>

<svelte:window on:keydown={onkeydown} />
<div class="game-container">
    <StartGameOverlay
        onClick={() => startGame()}
    />
    <div class="word-list">
        <section id="game">
            <Timer />
            <LanguageSelect />
        </section>
        {#if $game.state === "active"}
            {#each $game.sequence as letter, index}
                <letter
                    class="{letter.state} {
                        ($game.gameMode === 'zen' && index === $game.sequence.length - 1 ) || ($game.gameMode === 'functions' && index === $game.position) || ($game.gameMode === 'patterns' && index === $game.position)
                        ? 'active-after'
                        : ''}"
                    >{@html letterToHtml(letter.character)}</letter
                >
            {/each}
        {/if}
    </div>
    <!-- <div>
        {$game.letter_count} 
        {#each $game.sequence as letter, index}
            {letter.state[0]}
            
        {/each}
    </div> -->
</div>

<style>
    .game-container {
        background-color: var(--dark-background); /* Dark background */
        color: #ccc; /* Light grey text */
        font-family: "Menlo", monospace; /* Monospace font */
        letter-spacing: normal;
        font-size: 1.5functionexpoem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 20px;
        box-sizing: border-box;
    }
    #game {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 20px;
    }
    .word-list {
        /* display: flex */
        gap: 10px;
        width: 40%;
        margin-bottom: 20px;
    }
    .word {
        font-size: 24px;
    }
    .input-field {
        font-size: 24px;
        padding: 5px;
    }

    letter {
        color: var(--text-color-subdued);
        position: relative;
        font-size: 22px;

        &.active::before {
            content: "|";
            color: var(--main-color);
            font-size: 1em;
            position: absolute;
            left: -50%;
            animation: 1s blink infinite ease-in-out;
        }
        &.active-after::after {
            content: "|";
            color: var(--main-color);
            font-size: 1em;
            position: absolute;
            right: -50%;
            animation: 1s blink infinite ease-in-out;
        }
        &.is-last::before {
            left: 65%;
        }
        &.correct {
            color: var(--text-color);
        }
        &.incorrect {
            color: var(--error);
        }
        &.remaining {
            color: var(--text-color-subdued);
        }
        &.skipped {
            border-bottom: 1px solid var(--error);
        }
    }
</style>
