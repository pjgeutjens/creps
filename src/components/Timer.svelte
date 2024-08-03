<script>
    import { gameSettings, game } from "$lib/stores";
</script>
<style>
        time {
        color: var(--main-color);
    }
</style>

<time>{$game && $game.duration > 0 ? ($game.duration - $game.totalTimeElapsed).toFixed(0) : ""}</time>
