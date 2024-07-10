<script>
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import "../app.css";
    import TestConfig from "../components/TestConfig.svelte";
    import TestStats from "../components/TestStats.svelte";
    import Test from '../components/Test.svelte';
</script>

<div class="app-container">
    <header>
        <!-- <Header /> -->
    </header>
    <TestConfig />
    <TestStats />
    <main>
        <Test />
        <slot></slot>
        <!-- Main content will be injected here -->>
    </main>
    <footer>
    </footer>
</div>

