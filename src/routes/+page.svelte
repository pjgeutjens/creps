<script>
    import Test from "../components/Test.svelte";
    import TestConfig from "../components/TestConfig.svelte";
    import TestStats from "../components/TestStats.svelte";
    import TestHistory from "../components/TestHistory.svelte";
    import TestFuture from "../components/TestFuture.svelte";

    import Nord from "../components/themes/nord.svelte";
    import NordLight from "../components/themes/nord_light.svelte";
    import Monkey from "../components/themes/monkey.svelte";
    import { gameSettings } from "$lib/stores";

</script>

{#if $gameSettings.theme === "nord"}
    <Nord />
{/if}

{#if $gameSettings.theme === "nord_light"}
    <NordLight />
{/if}

{#if $gameSettings.theme === "monkey"}
    <Monkey />
{/if}
<TestConfig />
<TestHistory />
<TestFuture />
<TestStats />
<Test />
