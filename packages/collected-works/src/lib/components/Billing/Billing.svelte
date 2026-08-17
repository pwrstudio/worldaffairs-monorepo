<script lang="ts">
    import type { Billing } from '$lib/content';
    import { formatYears } from '$lib/modules/utils';

    let { billing }: { billing: Billing } = $props();

    let years = $derived(formatYears(billing));
</script>

<!--
	Artist, title and years, on both the poster and the exhibition text. The styles are the
	global `.billing` rules in global.css, since two pages share them; alignment is left to
	whichever page renders this, so the poster centres it and the text page ranges it left.
-->
<h1 class="billing">
    <span class="artist">{billing.artist}</span>
    <span class="title">{billing.title}</span>
    <span class="years">{years}</span>
</h1>
