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
</time>
