<script>
    import { game } from "$lib/stores";
</script>
<style>
        time {
        color: var(--main-color);
    }
</style>

<time>
    {#if $game.isInfinite()}
        {$game.totalTimeElapsed}
    {:else}
        {($game.duration - $game.totalTimeElapsed).toFixed(0)}
    {/if}
</time>
