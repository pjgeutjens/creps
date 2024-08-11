<script>
    import { game } from "$lib/stores";
    import { get } from "svelte/store";

    export let onClick;
</script>

<style>
    .overlay {
        position: fixed;
        z-index: 1000;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.60); /* Slightly lighter black overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color); /* Text color variable */
        font-size: 1em;
        cursor: pointer;
        backdrop-filter: blur(6px);
    }
    svg {
        margin-right: 1em;
    }
    </style>

{#if ($game.showStatsOverlay || $game.state === "ended")}
<button class="overlay" on:click={onClick}>
    STATS
    {$game.calculateWPM()} WPM
    {$game.calculateAccuracy().toFixed(2)}% ACC

    {#if ($game.state === "ended")}
        done
    {/if}
</button>
{/if}
