<script>
    let words = ["hello", "world", "svelte", "kit", "typing", "game"];
    let currentWordIndex = 0
    let currentInput = ""
    let correctWords = 0
    let startTime
    let gameActive = false
    let inputElement

    function startGame() {
        gameActive = true
        startTime = new Date().getTime()
        currentWordIndex = 0
        currentInput = ""
        correctWords = 0
        inputElement.focus()
    }

    function handleInput(event) {
        if (!gameActive) return
        const input = event.target.value
        if (input.endsWith(" ")) {
            if (input.trim() === words[currentWordIndex]) {
                correctWords++
            }
            currentWordIndex++
            currentInput = ""
        } else {
            currentInput = input
        }
        if (currentWordIndex >= words.length) {
                endGame();
            }
    }

    function endGame() {
        gameActive = false
        const endTime = new Date().getTime()
        const elapsedTime = (endTime - startTime) / 1000
        alert(`You typed ${correctWords} words in ${elapsedTime} seconds`)
    }
</script>

<style>
    .selected {
        text-decoration: underline;
        color: blue;
    }
    .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .word-list {
        display: flex;
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
</style>


<div class="game-container">
    <div class="word-list">
        {#each words as word, index}
            <span class="word" class:selected={index === currentWordIndex}>{word}</span>
        {/each}
    </div>
    <input 
        class="input-field" 
        type="text" 
        bind:value={currentInput} 
        bind:this={inputElement}
        on:input={handleInput}
        disabled={!gameActive}
    />
    <button on:click={startGame} disabled={gameActive}>Start Game</button>
</div>