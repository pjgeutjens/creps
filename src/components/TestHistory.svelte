<script lang="ts">
    import { game } from "$lib/stores";
</script>

<div class="future-container">
    <div class="word-list">
            {#each $game.history as prev }
                <button class="history-button" disabled></button>
            {/each}
    </div>
</div>

<style>
    .future-container {
        position: absolute;
        top: 20%;
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

    .history-button {
        background-color: var(--main-color);
        opacity: 0.7;
        color: var(--text-color-dark);
        border: none;
        width: 40px;
        border-radius: 8px;
        padding: 5px;
        margin: 5px;
        cursor: none;
        
    }
    .word-list {
        margin-bottom: 20px;
    }
</style>
