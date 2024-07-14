<script lang="ts">
    import { game } from "$lib/stores";


    const getFunctionSignatureFromText = (text: string) => {
        // return the contents of text up to the first curly bracket
        if ($game.settings.language === "python") {
            return text.split(":")[0];
        }
        return text.split("{")[0];
    };
</script>

<div class="future-container">
    <div class="word-list">
        <div class="word">
            {#each $game.tests.slice(1) as next }
                {#each getFunctionSignatureFromText(next.content) as letter, index}
                    <letter>{letter}</letter>
                {/each}
            {/each}
        </div>
    </div>
</div>

<style>
    .future-container {
        position: absolute;
        bottom: 20%;
        left: 50%;
        height: 120px;
        transform: translateX(-50%);
        padding: 10px;
        width: 60%;
        display: flex;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        border-radius: 8px;
        &::before {
            /* display the text 'up next' at the top of the div */
            content: "next";
            position: absolute;
            top: 0px;
        }
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
