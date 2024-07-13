<script>
    export let game;
    import { gameSettings } from "$lib/stores";
</script>
<style>
        time {
        color: var(--yellow);
    }
</style>

<time
                >{$gameSettings && $gameSettings.duration < 999
                    ? ($gameSettings.duration - game.timeElapsed).toFixed(0)
                    : "∞"}</time
            >
