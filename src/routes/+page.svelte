<script lang="ts">
    import { tick } from "svelte";
    let words = `
export const test = () => {
  return x;
};
  `.trim();
    let letterCorrectness = new Array(words.length).fill(State.REMAINING);
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

    type Part = {
        character: string;
        state: State;
    };

    enum State {
        REMAINING = "remaining",
        INCORRECT = "incorrect",
        CORRECT = "correct",
        SKIPPED = "skipped",
        SEMI = "semi",
    }

    async function startGame() {
        showStatsOverlay = false;
        letterCorrectness = new Array(words.length).fill(State.REMAINING);
        currentWordIndex = 0;
        currentLetterIndex = 0;
        gameActive = true;
        startTime = new Date().getTime();
        currentWordIndex = 0;
        currentInput = "";
        correctWords = 0;
        await tick();
        inputElement.focus();
        let duration = 0;
    }

    async function handleInput(event) {
        if (!gameActive) return;

        if (currentLetterIndex >= words.length) {
            endGame();
            return;
        }

        if (currentLetterIndex == -1) {
            currentLetterIndex = 0;
            return;
        }

        const keyPressed = event.key;

        if (keyPressed === "Shift" || keyPressed === "Control") {
            return;
        }

        if (keyPressed === "{") {
            console.log("curly");
            if (words[currentLetterIndex] === "{") {
                letterCorrectness[currentLetterIndex] = State.CORRECT;
            } else {
                console.log("incorrect", words[currentLetterIndex]);
                letterCorrectness[currentLetterIndex] = State.INCORRECT;
            }

            let nextLetter = words[currentLetterIndex++];
            while (
                !nextLetter.match(/[a-zA-Z]/) &&
                currentLetterIndex < words.length
            ) {
                event.preventDefault();
                letterCorrectness[currentLetterIndex] = State.CORRECT;
                event.target.value += nextLetter;
                currentLetterIndex++;
                nextLetter = words[currentLetterIndex];
            }
            currentLetterIndex--;
        }

        console.log(keyPressed, " - ", words[currentLetterIndex]);

        currentWordIndex = event.target.value.split(" ").length;

        if (keyPressed === "Backspace") {
            letterCorrectness[currentLetterIndex - 1] = State.REMAINING;
            currentLetterIndex--;
            return;
        }

        letterCorrectness[currentInput.length] =
            keyPressed === words[currentLetterIndex]
                ? State.CORRECT
                : State.INCORRECT;
        currentLetterIndex++;
    }

    function endGame() {
        gameActive = false;
        const endTime = new Date().getTime();
        duration = (endTime - startTime) / 1000;

        const totalWords = words.length;
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
    <div>{currentWordIndex} - {currentLetterIndex}</div>
    <div>{currentLetterIndex}</div>
    <div>
        {letterCorrectness.slice(
            currentLetterIndex - 2,
            currentLetterIndex + 1,
        )}
    </div>
    <div class="word-list">
        {#each words as letter, index}
            <letter
                class="{letterCorrectness[index]} {index === currentLetterIndex
                    ? 'active'
                    : ''}">{@html letterToHtml(letter)}</letter
            >
        {/each}
    </div>
    <textarea
        class="input-field hidden"
        bind:value={currentInput}
        on:keydown={handleInput}
        bind:this={inputElement}
        disabled={!gameActive}
    />
    <button on:click={() => inputElement.focus()}>f</button>
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
