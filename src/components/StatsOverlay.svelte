<script>
    import { game } from "$lib/stores";
    import { get } from "svelte/store";

    export let onClick;
</script>

<style>
    .overlay {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.10); /* Slightly lighter black overlay */
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

{#if ($game.showStatsOverlay)}
<button class="overlay" on:click={onClick}>
    STATS
    {$game.getElapsedTime()}
    {$game.getRemainingTime()}
    {$game.state}
</button>
{/if}
