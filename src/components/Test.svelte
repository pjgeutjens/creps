<script lang="ts">
    import { alphabet } from "$lib/alphabet";
    import { CharacterState, Game } from "$lib/game";
    import { gameSettings, gameStats, updateStats } from "$lib/stores";
    import { getRandomTestFunction, type TestFunction } from "$lib/tests";
    import { letterToHtml } from "$lib/utils";
    import { onDestroy } from "svelte";
    import LanguageSelect from "./LanguageSelect.svelte";

    import StartGameOverlay from "./StartGameOverlay.svelte";

    let game: Game;
    let timerRunning = false;
    let timer: number;

    let test: TestFunction;

    let unsubscribe = gameSettings.subscribe((currentValue) => {
        startGame()
    })

    onDestroy(() => {
        unsubscribe();
    });

    function startGame() {
        console.log("Starting game");
        test = getRandomTestFunction($gameSettings.language);
        $gameStats.active = true;
        $gameStats.ended = false;
        timerRunning = false;
        game = new Game(test.content.trim());
    }

    function endGame() {
        // gameActive = false;
        $gameStats.ended = true;
        const endTime = new Date().getTime();
        // duration = (endTime - game.start_time!) / 1000;

    }

    function onkeydown(e: KeyboardEvent) {
        if (!$gameStats.active && !$gameStats.ended) {
            $gameStats.active = true;
            startGame();
            return;
        }
        let current, next;
        if (!timerRunning) {
            timerRunning = true;
            timer = setInterval(() => {
                // TODO: Fix this randomness with the countdown timer for infinity
                if ($gameSettings.duration < 150) {
                }
                game.timeElapsed++;
                if (game.timeElapsed >= $gameSettings.duration) {
                    clearInterval(timer);
                    if (game.timeElapsed < 900) {
                        endGame();
                    }
                }
            }, 1000);
        }
        e.preventDefault();
        if (e.key.toLowerCase() === "backspace") {
            console.log("processing backspace");
            if (game.position > 0) {
                game.position--;
                game.sequence[game.position].state = CharacterState.REMAINING;
            }
        } else if (e.key.toLowerCase() === "enter") {
            console.log("processing enter");
            let current = game.get_current();
            let next = game.get_next();
            console.log(current, next);
            if (!next || !current) {
                game.position++;
                if (game.position >= game.sequence.length) {
                    game.word_count++;
                    endGame();
                }
            }
            if (current.character === ";") {
                switch (game.settings.ignoreSemicolon) {
                    case true:
                        console.log("IGNORING SEMICOLON");
                        current.state = CharacterState.SEMI;
                        game.position++;
                        break;
                    case false:
                        console.log("ERROR SEMICOLON");
                        current.state = CharacterState.INCORRECT;
                        game.error_pos.add(game.position);
                        game.position++;
                        break;
                }
                current = game.get_current();
                next = game.get_next();
            }

            while (
                (current && current.character.charCodeAt(0) === 10) ||
                current.character.charCodeAt(0) === 32 ||
                current.character === " "
            ) {
                // console.log("SKIP", current.character.charCodeAt(0))
                current.state = CharacterState.CORRECT;
                game.position++;
                current = game.get_current();
                next = game.get_next();
            }
        } else if (alphabet.has(e.key)) {
            game.letter_count++;
            current = game.get_current();
            next = game.get_next();
            console.log(current, next);
            if (current.character === e.key) {
                current.state = CharacterState.CORRECT;
                if (e.key === " " || e.key === ";") {
                    game.word_count++;
                }
                game.position++;
            } else if (e.key === " ") {
                if (
                    game.position > 0 &&
                    game.get_at(game.position - 1).character !== " "
                ) {
                    let position = game.position;
                    while (
                        position < game.sequence.length &&
                        game.get_at(position).character !== " "
                    ) {
                        game.error_pos.add(position);
                        game.get_at(position).state = CharacterState.SKIPPED;
                        game.was_skipped = true;
                        position++;
                    }
                    game.position = position;
                    game.position++;
                }
            } else {
                current.state = CharacterState.INCORRECT;
                game.error_pos.add(game.position);
                game.position++;
            }
        }
        if (game.position > 0 && game.start_time === null) {
            game.start_time = performance.now();
        }
        if (game.position >= game.sequence.length) {
            if (!game.was_skipped) {
                // for the last word we don't type space so
                // we count it at the end unless it's skipped
                game.word_count++;
            }
            endGame();
        }
        let newgameStats = {
            wordCount: game.word_count,
            charCount: game.letter_count,
            wordsPerMinute: ((game.letter_count / game.timeElapsed) * 60) / 5,
            accuracy:
                game.letter_count > 0
                    ? ((game.letter_count - game.error_pos.size) /
                          game.letter_count) *
                      100
                    : 0,
            active: $gameStats.active,
            ended: $gameStats.ended,
        };
        updateStats(newgameStats);
    }
</script>


<style>
    time {
        color: var(--yellow);
    }
    .game-container {
        background-color: #1e1e1e; /* Dark background */
        color: #ccc; /* Light grey text */
        font-family: "Menlo", monospace; /* Monospace font */
        font-size: 1.5expoem;
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
    #language-select {
        color: var(--gray);
        padding-left: 50px;
        font-size: small;

        &:hover {
            color: var(--text-color);
        }
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
    <StartGameOverlay onClick={startGame} gameActive={$gameStats.active} />
    <div class="word-list">
        <section id="game">
            <time
                >{$gameSettings && $gameSettings.duration < 999
                    ? ($gameSettings.duration - game.timeElapsed).toFixed(0)
                    : "∞"}</time
            >
            <LanguageSelect />
        </section>
        {#if $gameStats.active}
            {#each game.sequence as letter, index}
                <letter
                    class="{letter.state} {index === game.position
                        ? 'active'
                        : ''}">{@html letterToHtml(letter.character)}</letter
                >
            {/each}
        {/if}
    </div>
</div>
