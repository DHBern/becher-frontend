<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
</script>

<ContentContainer class="flex" dark>
	<div>
		<h1 class="h1">Ulrich Becher Digital</h1>
		<p>
			digitale Sammlung zum Werk Ulrich Bechers im Schweizerischen Literaturarchiv und im Deutschen
			Exilarchiv, Frankfurt
		</p>
	</div>
	<enhanced:img
		class="featured-image"
		src="$lib/assets/nachexil-basel.png?w=300"
		alt="Ulrich Becher in Basel"
	/>
</ContentContainer>
<ContentContainer class="mt-4" dark>
	<h2 class="h2">Virtueller Katalog</h2>
</ContentContainer>
<ContentContainer class="mt-4">
<p>es werden 16 Elemente angezeigt. 13 aus dem SLA, 3 aus dem DEA</p>
grid
</ContentContainer>

<style lang="postcss">
	.featured-image {
		margin-bottom: -106px;
		z-index: 1000000000;
		position: relative;
	}
</style>
