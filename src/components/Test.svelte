<script lang="ts">
    import { game } from "$lib/stores";
    import { isLast, letterToHtml } from "$lib/utils";
    import { onDestroy } from "svelte";

    import LanguageSelect from "./LanguageSelect.svelte";
    import StartGameOverlay from "./StartGameOverlay.svelte";
    import Timer from "./Timer.svelte";
    import StatsOverlay from "./StatsOverlay.svelte";
    import { get } from "svelte/store";

    let timer: NodeJS.Timeout;

    let unsubscribe = game.subscribe((currentValue) => {
        if (
            currentValue.language === $game.language &&
            currentValue.gameMode === $game.gameMode
        ) {
            return;
        }
        console.log("Game restart", currentValue);
        startGame();
    });

    onDestroy(() => {
        unsubscribe();
    });

    function startGame() {
        if (timer) {
            clearInterval(timer);
        }
        $game.start();
        $game.state = "active";
    }

    function endGame() {
        // gameActive = false;
        $game.end();
    }

    function checkTimer() {
        if (!get($game.timer).running) {
            $game.startTimer();
        }
    }
    
    function onkeydown(e: KeyboardEvent) {
        checkTimer();
        if (e.ctrlKey && e.key === "Escape") {
            toggleStatsOverlay();
        }
        $game.handleKeydown(e);
        $game.language = $game.language;
        $game.randy = Math.random();
    }

    function toggleStatsOverlay() {
        $game.showStatsOverlay = !$game.showStatsOverlay;
        if ($game.showStatsOverlay) {
            $game.pause();
        }
    }
</script>

<svelte:window on:keydown={onkeydown} />
<div class="game-container">
    {#if $game.showStatsOverlay}
        <StatsOverlay on:click={toggleStatsOverlay} />
    {/if}
    <StartGameOverlay on:click={startGame} />
    <div class="word-list">
        <section id="game">
            <Timer />
            <LanguageSelect />
        </section>
        {#if $game.state !== "setup"}
            {#each $game.sequence as letter, index}
                <letter
                    class="{letter.state} {$game.gameMode === 'zen' &&
                    index === $game.sequence.length - 1
                        ? 'active-after'
                        : ''} {($game.gameMode === 'functions' &&
                        index === $game.position) ||
                    ($game.gameMode === 'patterns' && index === $game.position)
                        ? 'active'
                        : ''}"
                    >{@html letterToHtml(
                        letter.character,
                        isLast(index, $game.sequence),
                    )}</letter
                >
            {/each}
        {/if}
    </div>
    <!-- <div>
        { $game.state}
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
        width: 50%;
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
