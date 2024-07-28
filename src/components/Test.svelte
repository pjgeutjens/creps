<script lang="ts">
    import { alphabet } from "$lib/alphabet";
    import { CharacterState, Game } from "$lib/game";
    import { game, get_at, get_current, get_next } from "$lib/stores";
    import { getRandomTestFunctions, type TestFunction } from "$lib/tests";
    import { letterToHtml } from "$lib/utils";
    import { onDestroy } from "svelte";
    import LanguageSelect from "./LanguageSelect.svelte";

    import StartGameOverlay from "./StartGameOverlay.svelte";
    import Timer from "./Timer.svelte";
    import { get } from "svelte/store";

    let timerRunning = false;
    let timer: NodeJS.Timeout;

    let tests: TestFunction[];


    let unsubscribe = game.subscribe((currentValue) => {
        if (currentValue.language === $game.language) {
            console.log("same")
            return
        }
        console.log("Game changed", currentValue);
        startGame(currentValue.language)
    })

    onDestroy(() => {
        unsubscribe();
    });

    function startGame(language: string = "javascript") {
        timerRunning = false;
        if (timer) {
            clearInterval(timer);
        }
        $game.start_time = new Date().getTime();
        $game.reset();
        $game.state = "active";
        $game.language = language;

    }

    function endGame() {
        // gameActive = false;
        $game.state = "ended";
        $game.end_time = performance.now();
    }

    function onkeydown(e: KeyboardEvent) {
        if (!game || $game.state === "ended" || $game.state === "paused") {
            startGame($game.language);
            return;
        }
        let current, next;
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
        e.preventDefault();
        if (e.key.toLowerCase() === "backspace") { 
            console.log("processing backspace");
            if ($game.position > 0) {
                $game.position--;
                $game.sequence[$game.position].state = CharacterState.REMAINING;
            }
        } else if (e.key.toLowerCase() === "enter") {
            console.log("processing enter");
            let current = get_current($game) ;
            let next = get_next($game);
            console.log(current, next);
            if (!next || !current) {
                $game.position++;
                if ($game.position >= $game.sequence.length) {
                    $game.word_count++;
                    endGame();
                }
            }
            if (current.character === ";") {
                switch ($game.ignoreSemicolon) {
                    case true:
                        console.log("IGNORING SEMICOLON");
                        current.state = CharacterState.SEMI;
                        $game.position++;
                        break;
                    case false:
                        console.log("ERROR SEMICOLON");
                        current.state = CharacterState.INCORRECT;
                        $game.error_pos.add($game.position);
                        $game.position++;
                        break;
                }
                current = get_current($game);
                next = get_next($game);
            }

            while (
                (current && current.character.charCodeAt(0) === 10) ||
                current.character.charCodeAt(0) === 32 ||
                current.character === " "
            ) {
                // console.log("SKIP", current.character.charCodeAt(0))
                current.state = CharacterState.CORRECT;
                $game.position++;
                current = get_current($game);
                next = get_next($game);
            }
        } else if (alphabet.has(e.key)) {
            $game.letter_count++;
            current = get_current($game);
            next = get_next($game);
            console.log(current, next);
            if (current.character === e.key) {
                current.state = CharacterState.CORRECT;
                if (e.key === " " || e.key === ";") {
                    $game.word_count++;
                }
                $game.position++;
            } else if (e.key === " ") {
                if (
                    $game.position > 0 &&
                    get_at($game, $game.position - 1).character === " "
                ) {
                    let position = $game.position;
                    while (
                        position < $game.sequence.length &&
                        get_at($game, position).character === " "
                    ) {
                        $game.error_pos.add(position);
                        get_at($game, position).state = CharacterState.SKIPPED;
                        $game.was_skipped = true;
                        position++;
                    }
                    $game.position = position;
                    $game.position++;
                }
            } else {
                current.state = CharacterState.INCORRECT;
                $game.error_pos.add($game.position);
                $game.position++;
            }
        }
        if ($game.position > 0 && $game.start_time === null) {
            $game.start_time = performance.now();
        }
        if ($game.position >= $game.sequence.length) {
            if (!$game.was_skipped) {
                // for the last word we don't type space so
                // we count it at the end unless it's skipped
                $game.word_count++;
            }
            $game.nextTest();
        }
        
        // let newgameStats = {
        //     wordCount: $game.word_count,
        //     charCount: $game.letter_count,
        //     wordsPerMinute: (($game.letter_count / game.timeElapsed) * 60) / 5,
        //     accuracy:
        //         game.letter_count > 0
        //             ? ((game.letter_count - game.error_pos.size) /
        //                   game.letter_count) *
        //               100
        //             : 0,
        //     active: $gameStats.active,
        //     ended: $gameStats.ended,
        // };
        // updateStats(newgameStats);
        $game.updateStats();
    }
</script>


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
        color: var(--gray);
        position: relative;
        font-size: 22px;

        &.active::before {
            content: "|";
            color: var(--yellow);
            font-size: 1em;
            position: absolute;
            left: -50%;
            animation: 1s blink infinite ease-in-out;
        }
        &.is-last::before {
            left: 65%;
        }
        &.correct {
            color: var(--text-color);
        }
        &.incorrect {
            color: var(--red);
        }
        &.remaining {
            color: var(--gray);
        }
        &.skipped {
            border-bottom: 1px solid var(--red);
        }
    }
</style>

<svelte:window on:keydown={onkeydown} />
<div class="game-container">
    <StartGameOverlay onClick={() => startGame($game.language)} gameActive={$game.state === 'active'} />
    <div class="word-list">
        <section id="game">
            <Timer />
            <LanguageSelect />
        </section>
        {#if $game.state === 'active'}
            {#each $game.sequence as letter, index}
                <letter
                    class="{letter.state} {index === $game.position
                        ? 'active'
                        : ''}">{@html letterToHtml(letter.character)}</letter
                >
            {/each}
        {/if}
    </div>
</div>
