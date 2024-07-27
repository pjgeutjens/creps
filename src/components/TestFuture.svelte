<script lang="ts">
    import { game } from "$lib/stores";


    const getFunctionSignatureFromText = (text: string) => {
        // return the contents of text up to the first curly bracket
        let header
        if ($game.language === "python") {
            header = text.split(":")[0].replaceAll("def", "").trim();
        } else if ($game.language === "javascript") {
            header = text.split("{")[0].replaceAll("function", "").trim();
        } else if ($game.language === "typescript") {
            header = text.split("{")[0].replaceAll("function", "").trim();
        } else if ($game.language === "golang") {
            header = text.split("{")[0].replaceAll("func", "").trim();
        } else if ($game.language === "bash") {
            header = text.split("{")[0].replaceAll("function", "").trim();
        }
        return header;
        
    };
</script>

<div class="future-container">
    <div class="word-list">
            {#each $game.tests.slice($game.testIndex+1) as next }
                <button class="future-button" disabled>
                {getFunctionSignatureFromText(next.content)}
                </button>
            {/each}
    </div>
</div>

<style>
    .future-container {
        position: absolute;
        bottom: 20%;
        left: 50%;
        height: 120px;
        transform: translateX(-50%);
        /* padding: 10px; */
        width: 60%;
        display: flex;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        border-radius: 8px;
        &::before {
            /* display the text 'up next' at the top of the div */
            /* content: "next"; */
            position: relative;
            top: -65funpx;
        }
    }

    .future-button {
        background-color: var(--yellow);
        opacity: 0.7;
        color: #333;
        border: none;
        /* width: 97%; */
        border-radius: 8px;
        padding: 5px;
        margin: 5px;
        cursor: none;
        
    }
    .word-list {
        /* display: flex; */
        /* display: grid; */
        /* gap: 10px; */
        margin-bottom: 20px;
    }

    .word::before {
        content: "-> ";
    }
    letter {
        color: var(----text-color);
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
