<script>
    import "../app.css";
    import Header from "../components/Header.svelte";
    import TestConfig from "../components/TestConfig.svelte";
</script>

<div class="app-container">
    <header>
        <!-- <Header /> -->
    </header>
    <TestConfig />
    <main>
        <slot></slot>
        <!-- Main content will be injected here -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</div>

