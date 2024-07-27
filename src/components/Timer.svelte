<script>
    import { gameSettings, game } from "$lib/stores";
</script>
<style>
        time {
        color: var(--yellow);
    }
</style>

<time
                >{$game && $game.duration < 999
                    ? ($game.duration - $game.timeElapsed).toFixed(0)
                    : "∞"}</time
            >
