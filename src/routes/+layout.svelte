<script>
    import "../app.css";
    import TestConfig from "../components/TestConfig.svelte";
    import TestStats from "../components/TestStats.svelte";
</script>

<div class="app-container">
    <header>
        <!-- <Header /> -->
    </header>
    <TestConfig />
    <TestStats />
    <main>
        <slot></slot>
        <!-- Main content will be injected here -->
    </main>
    <footer>
    </footer>
</div>

