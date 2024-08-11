<script>
    import { game } from "$lib/stores";
    import { get } from "svelte/store";

    let t = $game.timer;
</script>
<style>
        time {
        color: var(--main-color);
    }
</style>

<time>
    {#if $game.isInfinite()}
        {($t.elapsed).toFixed(0)}
    {:else}
    {($t.remaining).toFixed(0)}
    {/if}
    {#if !$t.running}
    <i class="fa-solid fa-pause"></i>
    {/if}


    
    <!-- <button on:click={() => $game.stopTimer()}>stop</button>
    <button on:click={() => $game.startTimer()}>start</button>
    <button on:click={() => $game.resetTimer()}>reset</button> -->
</time>
