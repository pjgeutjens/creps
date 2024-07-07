<script>
    import "../app.css";
    import Header from "../components/Header.svelte";
    let testDuration = "30"; // Default test duration
    let language = "javascript"; // Default language
</script>

<div class="app-container">
    <header>
        <!-- <Header /> -->
    </header>
    <div class="test-config">
        <div class="language-buttons">
            <button
                on:click={() => (language = "javascript")}
                class:selected={language === "javascript"}>javascript</button
            >
            <button
                on:click={() => (language = "typescript")}
                class:selected={language === "typescript"}>typescript</button
            >
            <button
                on:click={() => (language = "golang")}
                class:selected={language === "golang"}>golang</button
            >
            <button
                on:click={() => (language = "bash")}
                class:selected={language === "bash"}>bash</button
            >
        </div>
        <div class="divider"></div>
        <div class="duration-buttons">
            <button
                on:click={() => (testDuration = "30")}
                class:selected={testDuration === "30"}>30</button
            >
            <button
                on:click={() => (testDuration = "60")}
                class:selected={testDuration === "60"}>60</button
            >
            <button
                on:click={() => (testDuration = "120")}
                class:selected={testDuration === "120"}>120</button
            >
            <button
                on:click={() => (testDuration = "∞")}
                class:selected={testDuration === "∞"} class="infinity">∞</button
            >
        </div>
    </div>
    <main>
        <slot></slot>
        <!-- Main content will be injected here -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</div>

<style>
    .test-config {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
    }
    .language-buttons {
        display: flex;
        gap: 0px;
        border-radius: 5px;
        padding-left: 5px;
        overflow: hidden;
        border: 1 px solid #333;
    }

    .duration-buttons {
        display: flex;
        gap: 0px;
        border-radius: 5px;
        overflow: hidden;
        border: 1 px solid #333;
    }
    button {
        display: inline-flex;
        height: 25px;
        background-color: #333;
        color: var(--gray); /* Grey text */
        padding: 5px;
        border: none;
        cursor: pointer;
    }

    .infinity {
        font-size: 1.2rem;
        padding-top: 2px;
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
    select {
        padding: 10px;
    }
</style>
