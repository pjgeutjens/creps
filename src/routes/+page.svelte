<script>
    import Test from "../components/Test.svelte";
    import TestConfig from "../components/TestConfig.svelte";
    import TestStats from "../components/TestStats.svelte";
    import TestHistory from "../components/TestHistory.svelte";
    import TestFuture from "../components/TestFuture.svelte";

    import Nord from "../components/themes/nord.svelte";
<<<<<<< HEAD
    import NordLight from "../components/themes/nord_light.svelte";
    import Monkey from "../components/themes/monkey.svelte";

    let theme = "nord";
=======
    import Monkey from "../components/themes/monkey.svelte";

    let theme = "monkey";
>>>>>>> 0aa40a35d0ada82efb9a27f2366a1dd41c6d8eb3
</script>

{#if theme === "nord"}
    <Nord />
{/if}
<<<<<<< HEAD

{#if theme === "nord_light"}
    <NordLight />
{/if}

{#if theme === "monkey"}
    <Monkey />
{/if}
{theme}
=======
{#if theme === "monkey"}
    <Monkey />
{/if}
>>>>>>> 0aa40a35d0ada82efb9a27f2366a1dd41c6d8eb3
<TestConfig />
<TestHistory />
<TestFuture />
<TestStats />
<Test />
