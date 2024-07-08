<script lang="ts">
    import { alphabet } from "$lib/alphabet";
    import { CharacterState, Game, type GameState } from "$lib/game";
    import { updateStats } from "$lib/stores";
    import { getRandomTestFunction, inputFunctions } from "$lib/tests";
    import { letterToHtml } from "$lib/utils";
    import StartGameOverlay from "../components/StartGameOverlay.svelte";
    let gameActive = false;
    let gameEnded = false;
    let timerRunning = false;
    let showStatsOverlay = false;
    let game: Game;
    let duration: number;
    let accuracy: string, wpm: string;
    let timer: number;

    let test = getRandomTestFunction();

    async function startGame() {
        showStatsOverlay = false;
        gameActive = true;
        game = new Game(test);
    }

    function endGame() {
        gameActive = false;
        gameEnded = true
        const endTime = new Date().getTime();
        duration = (endTime - game.start_time!) / 1000;

        const totalWords = test.split(" ").length;
        accuracy = "0";
        wpm = "0";

        showStatsOverlay = true;
        // alert(`Game over! You typed ${correctWords} words correctly in ${duration} seconds.`);
    }

    function onkeydown(e: KeyboardEvent) {
        if (!gameActive && !gameEnded) {
            gameActive = true;
            startGame();
            return
        }
        let current, next;
        if (!timerRunning) {
            timerRunning = true;
            timer = setInterval(() => {
                game.duration--;
                game.timeElapsed++;
                if (game.duration <= 0) {
                    clearInterval(timer);
                    endGame();
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
        let newStats = {
            wordCount: game.word_count,
            charCount: game.letter_count,
            wordsPerMinute: (game.letter_count / game.timeElapsed * 60 ) / 5,
            accuracy: game.letter_count > 0 ? (game.letter_count - game.error_pos.size) / game.letter_count * 100 : 0,
        };
        updateStats(newStats);
  };
</script>

<svelte:window on:keydown={onkeydown} />

<div class="game-container">
    <StartGameOverlay onClick={startGame} {gameActive} />
    <div class="word-list">
        <section id="game">
            <time>{game ? game.duration : ""}</time>
            <p></p>
        </section>
        {#if gameActive}
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
    .hidden {
        opacity: 20%;
        pointer-events: none;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    letter {
        color: var(--gray);
        position: relative;

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
