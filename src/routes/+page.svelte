<script lang="ts">
    import { alphabet } from "$lib/alphabet";
    import { State, Game, type GameState } from "$lib/game";
    import { letterToHtml } from "$lib/utils";
    let gameActive = false;
    let showStatsOverlay = false;
    let game: Game;
    let duration: number;
    let accuracy: string, wpm: string;

    let text = `
export const test = () => {
  return x;
};
  `.trim();

    async function startGame() {
        showStatsOverlay = false;
        gameActive = true;
        game = new Game(text);
    }

    function endGame() {
        gameActive = false;
        const endTime = new Date().getTime();
        duration = (endTime - game.start_time!) / 1000;

        const totalWords = text.split(" ").length;
        accuracy = "0";
        wpm = "0";

        showStatsOverlay = true;
        // alert(`Game over! You typed ${correctWords} words correctly in ${duration} seconds.`);
    }

    function onkeydown(e: KeyboardEvent) {
        let current, next;
        console.log("onKyeDown", e.key);
        // game.sequence.forEach((element) =>
        //   // console.log(element.character, "->", element.character.charCodeAt(0), element.character.length, "->",  element.state),
        // );
        e.preventDefault();
        // const key = e.key.toLowerCase();
        console.log(e.key);
        console.log("position:", game.position);
        const last_position = game.position;
        if (e.key.toLowerCase() === "backspace") {
            console.log("processing backspace");
            if (game.position > 0) {
                game.position--;
                game.sequence[game.position].state = State.REMAINING;
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
                switch (game_settings.ignoreSemicolon) {
                    case true:
                        console.log("IGNORING SEMICOLON");
                        current.state = State.SEMI;
                        game.position++;
                        break;
                    case false:
                        console.log("ERROR SEMICOLON");
                        current.state = State.INCORRECT;
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
                current.state = State.CORRECT;
                game.position++;
                current = game.get_current();
                next = game.get_next();
            }
        } else if (alphabet.has(e.key)) {
            console.log("processing letter");
            current = game.get_current();
            next = game.get_next();
            console.log(current, next);
            if (current.character === e.key) {
                current.state = State.CORRECT;
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
                        game.get_at(position).state = State.SKIPPED;
                        game.was_skipped = true;
                        position++;
                    }
                    game.position = position;
                    game.position++;
                }
            } else {
                current.state = State.INCORRECT;
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
    }
</script>

<svelte:window on:keydown={onkeydown} />

<div class="game-container">
    {#if !gameActive}
        <div class="overlay" on:click={startGame}>
            Click here to start typing
        </div>
    {/if}

    {#if showStatsOverlay}
        <div class="overlay">
            <div class="stats">
                <p>Time: {duration} seconds</p>
                <p>Accuracy: {accuracy}%</p>
                <p>WPM: {wpm}</p>
                <button on:click={startGame}>Restart</button>
            </div>
        </div>
    {/if}
    <div class="word-list">
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
    :root {
        --color-scheme: light dark;
        --green: #00b755;
        --yellow: #daaf38;
        --red: #ca4754;
        --black: #222;
        --gray: #999;
    }
    .game-container {
        background-color: #1e1e1e; /* Dark background */
        color: #ccc; /* Light grey text */
        font-family: "Menlo", monospace; /* Monospace font */
        font-size: 1.2em;
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
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75); /* Slightly lighter black overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 24px;
        cursor: pointer;
        backdrop-filter: blur(6px);
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
            font-size: 16px;
            position: absolute;
            left: -50%;
            top: 2px;
            animation: 1s blink infinite ease-in-out;
        }
        &.is-last::before {
            left: 65%;
        }
        &.correct {
            color: var(--green);
        }
        &.incorrect {
            color: var(--red);
        }
        &.remaining {
            color: white;
        }
        &.skipped {
            border-bottom: 1px solid var(--red);
        }
    }

    @keyframes -global-blink {
        0%,
        33% {
            opacity: 1;
        }

        67% {
            opacity: 0;
        }
    }
</style>
