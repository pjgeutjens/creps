<script lang="ts">
    import { game } from "$lib/stores";


    const getFunctionSignatureFromText = (text: string) => {
        // return the contents of text up to the first curly bracket
        let header
        return text.split("(")[0].replaceAll("def", "").replaceAll("function", "").replaceAll("func", "").trim();
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
        background-color: var(--main-color);
        opacity: 0.7;
        color: var(--text-color-dark);
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
</style>
