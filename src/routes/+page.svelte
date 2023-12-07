<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
</script>

<ContentContainer class="flex">
	<div class="">
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
<div style="background: blue; height:50px;"></div>

<style lang="postcss">
	.featured-image {
		margin-bottom: -106px;
		z-index: 1000000000;
		position: relative;
	}
</style>
