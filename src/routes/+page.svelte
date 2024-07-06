<script lang="ts">
    import { sequence } from "@sveltejs/kit/hooks";
    import { tick } from "svelte";
    let currentWordIndex = 0;
    let currentLetterIndex = 0;
    let currentInput = "";
    let correctWords = 0;
    let startTime;
    let gameActive = false;
    let showStatsOverlay = false;
    let inputElement;
    let duration = 0;
    let accuracy = "";
    let wpm = "";
    let game_state: any = {
        position: 0,
        sequence: [],
    };

    enum State {
        REMAINING = "remaining",
        INCORRECT = "incorrect",
        CORRECT = "correct",
        SKIPPED = "skipped",
        SEMI = "semi",
    }

    type Part = {
        character: string;
        state: State;
    };

    type GameState = {
        position: number;
        sequence: Part[];
        text: string;
        get_current: () => Part;
        get_next: () => Part;
        get_at: (position: number) => Part;
        letter_count: number,
        word_count: number,
        start_time: number | null,
        done: () => void,
        error_pos: Set<number>,
        was_skipped: false,
        first: true,
    };

    type Settings = {
        ignoreSemicolon: boolean;
    };

    const game_settings: Settings = {
        ignoreSemicolon: false,
    };

    const lowerCaseLetters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    const upperCaseLetters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];
    const numbersZeroToNine = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    ];
    const selectedSpecialCharacters = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "+",
        "-",
        ".",
        "~",
        "|",
        "<",
        ">",
        "=",
        "-",
        "_",
        "/",
        ":",
        ";",
        "?",
        "[",
        "]",
        "{",
        "}",
        "~",
    ];
    const allCharacters = lowerCaseLetters
        .concat(upperCaseLetters)
        .concat(numbersZeroToNine)
        .concat(selectedSpecialCharacters);
    const alphabet = new Set(allCharacters.concat([" "]));

    let text = `
export const test = () => {
  return x;
};
  `.trim()

    async function startGame() {
        showStatsOverlay = false;
        gameActive = true;
        game_state = {
            position: 0,
            
            sequence: Array.from(text).map((character: string) => ({
                character,
                state: State.REMAINING,
            })),
            letterCorrectness: new Array(text.length).fill(State.REMAINING),
            get_current: () => game_state.sequence[game_state.position],
            get_next: () => game_state.sequence[game_state.position + 1],
            get_at: (position: number) => game_state.sequence[position],
            letter_count: text.length,
            word_count: 0,
            done: () => {},
            start_time: null,
            error_pos: new Set(),
            was_skipped: false,
            first: true,
        };

        // showStatsOverlay = false;
        // currentWordIndex = 0;
        // currentLetterIndex = 0;
        // gameActive = true;
        // startTime = new Date().getTime();
        // currentWordIndex = 0;
        // currentInput = "";
        // correctWords = 0;
        // // await tick();
        // // inputElement.focus();
        // let duration = 0;
    }

    function onkeydown(e: KeyboardEvent) {
        let current, next
        console.log("onKyeDown", e.key);
        // game_state.sequence.forEach((element) =>
        //   // console.log(element.character, "->", element.character.charCodeAt(0), element.character.length, "->",  element.state),
        // );
        e.preventDefault();
        // const key = e.key.toLowerCase();
        console.log(e.key);
        console.log("position:", game_state.position);
        const last_position = game_state.position;
        if (e.key.toLowerCase() === "backspace") {
            console.log("processing backspace");
            if (game_state.position > 0) {
                game_state.position--;
                game_state.sequence[game_state.position].state =
                    State.REMAINING;
            }
        } else if (e.key.toLowerCase() === "enter") {
            console.log("processing enter");
            let current = game_state.get_current();
            let next = game_state.get_next();
            console.log(current, next);
            if (!next || !current) {
                game_state.position++;
                if (game_state.position >= game_state.sequence.length) {
                    game_state.word_count++;
                    endGame();
                }
            }
            if (current.character === ";") {
                switch (game_settings.ignoreSemicolon) {
                    case true:
                        console.log("IGNORING SEMICOLON");
                        current.state = State.SEMI;
                        game_state.position++;
                        break;
                    case false:
                        console.log("ERROR SEMICOLON");
                        current.state = State.INCORRECT;
                        game_state.error_pos.add(game_state.position);
                        game_state.position++;
                        break;
                }
                current = game_state.get_current();
                next = game_state.get_next();
            }

            while (
                (current && current.character.charCodeAt(0) === 10) ||
                current.character.charCodeAt(0) === 32 ||
                current.character === " "
            ) {
                // console.log("SKIP", current.character.charCodeAt(0))
                current.state = State.CORRECT;
                game_state.position++;
                current = game_state.get_current();
                next = game_state.get_next();
            }
        } else if (alphabet.has(e.key)) {
            console.log("processing letter");
            current = game_state.get_current();
            next = game_state.get_next();
            console.log(current, next);
            if (current.character === e.key) {
                current.state = State.CORRECT;
                if (e.key === " " || e.key === ";") {
                    game_state.word_count++;
                }
                game_state.position++;
            } else if (e.key === " ") {
                if (
                    game_state.position > 0 &&
                    game_state.get_at(game_state.position - 1).character !== " "
                ) {
                    let position = game_state.position;
                    while (
                        position < game_state.sequence.length &&
                        game_state.get_at(position).character !== " "
                    ) {
                        game_state.error_pos.add(position);
                        game_state.get_at(position).state = State.SKIPPED;
                        game_state.was_skipped = true;
                        position++;
                    }
                    game_state.position = position;
                    game_state.position++;
                }
            } else {
                current.state = State.INCORRECT;
                game_state.error_pos.add(game_state.position);
                game_state.position++;
            }
        }
        if (game_state.position > 0 && game_state.start_time === null) {
            game_state.start_time = performance.now();
        }
        if (game_state.position >= game_state.sequence.length) {
            if (!game_state.was_skipped) {
                // for the last word we don't type space so
                // we count it at the end unless it's skipped
                game_state.word_count++;
            }
            endGame();
        }
    }

    function endGame() {
        gameActive = false;
        const endTime = new Date().getTime();
        duration = (endTime - game_state.startTime) / 1000;

        const totalWords = (text.split(" ")).length;
        accuracy = ((correctWords / totalWords) * 100).toFixed(2);
        wpm = ((correctWords / duration) * 60).toFixed(2);

        showStatsOverlay = true;
        // alert(`Game over! You typed ${correctWords} words correctly in ${duration} seconds.`);
    }

    function letterToHtml(letter: string) {
        if (letter.charCodeAt(0) === 10) {
            return `<br/>`;
        }
        if (letter.charCodeAt(0) === 32) {
            return `&ensp;`;
        }
        return `${letter}`;
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
        {#each game_state.sequence as letter, index}
            <letter
                class="{letter.state} {index === currentLetterIndex
                    ? 'active'
                    : ''}">{@html letterToHtml(letter.character)}</letter
            >
        {/each}
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
    .selected {
        text-decoration: underline;
        color: blue;
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
            font-size: 1em;
            position: absolute;
            left: -60%;
            animation: 1s blink infinite ease-in-out;
        }
        &.correct {
            color: green;
        }
        &.incorrect {
            color: red;
        }
        &.remaining {
            color: white;
        }
        &.skipped {
            border-bottom: 1px solid red;
        }
    }

    textarea {
        width: 100%;
        height: 300px;
        z-index: 100;
    }
</style>
