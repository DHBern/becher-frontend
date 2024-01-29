<script>
	import { base } from '$app/paths';

	/**
	 * @type {{date: string, signature: string, key: string, iiif: string, ext: number, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];

	let className = '';
	export { className as class };

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
	$: showButtons = elemGrid?.scrollWidth !== elemGrid?.clientWidth;
</script>

<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center pt-8 {className}">
	{#if showButtons}
		<button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
			<i class="fa-solid fa-arrow-left" />
		</button>
	{/if}
	<div
		bind:this={elemGrid}
		class="snap-x snap-mandatory scroll-smooth flex pb-2 gap-4 overflow-x-auto"
	>
		{#each items as item (item.key)}
			<article class="shrink-0 w-full sm:w-[200px] snap-start transition-transform">
				<a href="{base}/item/{item.key}">
					<figure>
						<div
							class="{item.holding_institution === 'SLA'
								? 'bg-primary-500'
								: 'bg-tertiary-500'} hover:brightness-110 relative
								placeholder-circle animate-pulse"
						>
							<!-- region/size/rotation/quality.format
								cut 10% of the border of the image, make it 200px wide, don't turn it-->
							<img
								class="z-20"
								src="{item.iiif.replace('info.json', '')}pct:5,5,90,90/200,/0/default.jpg"
								alt={item.title}
								width="200"
								loading="lazy"
								on:load={(e) => {
									e.target.parentElement.classList.remove('animate-pulse', 'placeholder-circle');
								}}
							/>
							{#if item.ext}
								<p
									class="absolute right-0 bottom-0 px-2 bg-surface-backdrop-token text-on-surface-token"
								>
									{item.ext} <span class="sr-only">Seiten</span>
								</p>
							{/if}
						</div>
						<figcaption>{item.title} [{item.date}]</figcaption>
					</figure>
				</a>
			</article>
		{/each}
	</div>
	{#if showButtons}
		<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
			<i class="fa-solid fa-arrow-right" />
		</button>
	{/if}
</div>
