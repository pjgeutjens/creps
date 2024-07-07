<script>
        let testDuration = "30"; // Default test duration
        let language = "javascript"; // Default language
</script>

<style>
    .test-stats {
        position: absolute;
        bottom: 15%;
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
    .stats-buttons {
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

    .count-buttons {
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
    }

    .selected {
        color: var(--yellow); /* Yellow text */
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


<div class="test-stats">
    <div class="stats-buttons">
        <button class="selected">wpm</button
        >
        <button>67.3</button
        >
        <button class="selected">acc</button>
        <button>95.7%</button
        >
    </div>
    <div class="divider"></div>
    <div class="count-buttons">
        <button class="selected">wc</button>
        <button
            on:click={() => (testDuration = "60")}
            class:selected={testDuration === "60"}>34</button
        >
        <button class="selected">cc</button>
        <button
            on:click={() => (testDuration = "60")}
            class:selected={testDuration === "60"}>148</button
        >
    </div>
</div>