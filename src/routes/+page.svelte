<script>
    import Test from "../components/Test.svelte";
    import TestConfig from "../components/TestConfig.svelte";
    import TestStats from "../components/TestStats.svelte";
    import TestHistory from "../components/TestHistory.svelte";
    import TestFuture from "../components/TestFuture.svelte";

    import Nord from "../components/themes/nord.svelte";
    import Monkey from "../components/themes/monkey.svelte";

    let theme = "monkey";
</script>

{#if theme === "nord"}
    <Nord />
{/if}
{#if theme === "monkey"}
    <Monkey />
{/if}
<TestConfig />
<TestHistory />
<TestFuture />
<TestStats />
<Test />
