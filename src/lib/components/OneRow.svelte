<script>
	import { base } from '$app/paths';

	/**
	 * @type {{date: string, signature: string, key: string, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];

	/**
	 * @type HTMLDivElement
	 */
	let elemGrid;

	function multiColumnLeft() {
		let x = elemGrid.scrollWidth;
		if (elemGrid.scrollLeft !== 0) x = elemGrid.scrollLeft - elemGrid.clientWidth;
		elemGrid.scroll(x, 0);
	}

	function multiColumnRight() {
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (elemGrid.scrollLeft < elemGrid.scrollWidth - elemGrid.clientWidth - 1)
			x = elemGrid.scrollLeft + elemGrid.clientWidth;
		elemGrid.scroll(x, 0);
	}
</script>

<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center pt-8">
	{#if elemGrid?.scrollWidth !== elemGrid?.clientWidth}
		<button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
			<i class="fa-solid fa-arrow-left" />
		</button>
	{/if}
	<div
		bind:this={elemGrid}
		class="snap-x snap-mandatory scroll-smooth flex pb-2 gap-4 overflow-x-auto"
	>
		{#each items as item (item.key)}
			<article class="shrink-0 w-full sm:w-1/2 md:w-1/4 snap-start transition-transform">
				<a href="{base}/item/{item.key}">
					<figure>
						<div
							class="bg-{item.holding_institution === 'SLA'
								? 'primary'
								: 'tertiary'}-500 hover:brightness-110"
						>
							<enhanced:img src="$lib/assets/placeholder.jpg?w=300" class="mx-auto"></enhanced:img>
						</div>
						<figcaption>{item.title} [{item.date}]</figcaption>
					</figure>
				</a>
			</article>
		{/each}
	</div>
	{#if elemGrid?.scrollWidth !== elemGrid?.clientWidth}
		<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
			<i class="fa-solid fa-arrow-right" />
		</button>
	{/if}
</div>
