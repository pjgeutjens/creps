<script>
    import { gameSettings } from "$lib/stores";

        
</script>

<style>
    .test-config {
        position: absolute;
        top: 10%;
        left: 50%;
        height: 30px;
        transform: translateX(-50%);
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
        border-radius: 8px;
    }
    .language-buttons {
        display: flex;
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 5px;
        gap: 0px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        overflow: hidden;
        border: 1 px solid #333;
    }

    .duration-buttons {
        display: flex;
        gap: 0px;
        font-size: 14px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        border: 1 px solid #333;
    }
    button {
        display: inline-flex;
        height: 25px;
        background-color: #333;
        color: var(--gray); /* Grey text */
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
        border: none;
        cursor: pointer;
        &:hover {
            color: var(--text-color);
        }

        &.selected {
            color: var(--yellow); /* Yellow text */
        }
    }

    .infinity {
        position:relative;
        bottom: 2px;
        font-size: 18px;
    }

    .divider {
        background-color: var(--gray); /* Grey line */
    }

    /* Additional styles for button hover effect (optional) */
    button:hover {
        background-color: #444;
    }
    .divider {
        height: 20px;
        width: 2px;
        background-color: #333;
        margin: 0 20px;
    }
</style>


<div class="test-config">
    <div class="language-buttons">
        <button
            on:click={() => ($gameSettings.language = "javascript")}
            class:selected={$gameSettings.language === "javascript"}>javascript</button
        >
        <button
            on:click={() => ($gameSettings.language = "typescript")}
            class:selected={$gameSettings.language === "typescript"}>typescript</button
        >
        <button
            on:click={() => ($gameSettings.language = "python")}
            class:selected={$gameSettings.language === "python"}>python</button
        >
        <button
            on:click={() => ($gameSettings.language = "golang")}
            class:selected={$gameSettings.language === "golang"}>golang</button
        >
        <button
            on:click={() => ($gameSettings.language = "bash")}
            class:selected={$gameSettings.language === "bash"}>bash</button
        >
    </div>
    <div class="divider"></div>
    <div class="duration-buttons">
        <button
            on:click={() => ($gameSettings.duration = 30)}
            class:selected={$gameSettings.duration === 30}>30</button
        >
        <button
            on:click={() => ($gameSettings.duration = 60)}
            class:selected={$gameSettings.duration === 60}>60</button
        >
        <button
            on:click={() => ($gameSettings.duration = 120)}
            class:selected={$gameSettings.duration === 120}>120</button
        >
        <button
            on:click={() => ($gameSettings.duration = 999)}
            class:selected={$gameSettings.duration === 999} class="infinity">∞</button
        >
    </div>
</div>