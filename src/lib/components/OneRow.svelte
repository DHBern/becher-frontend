<script>
	import { base } from '$app/paths';

	/**
	 * @type {import('$lib/itemtype.ts').Item[]}
	 */
	export let items = [];

	let className = '';
	export { className as class };

	/**
	 * @type HTMLDivElement
	 */
	let elemGrid;
	let showButtons = false;

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

	const setButtons = (/** @type {HTMLDivElement} */ e) => {
		const element = elemGrid || e;
		showButtons = element.scrollWidth >= element.clientWidth + 2 * (16 + 43);
	};

	const setClasses = (/** @type {HTMLImageElement} */ e) => {
		if (e.complete) {
			e.classList.add('border-4', 'border-current');
			// @ts-ignore
			e.parentElement.classList.remove('animate-pulse', 'placeholder-circle');
		}
	};
</script>

<svelte:window
	on:resize={(e) => {
		setButtons(elemGrid);
	}}
/>

<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center pt-8 {className}">
	{#if showButtons}
		<button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
			<i class="fa-solid fa-arrow-left" />
		</button>
	{/if}
	<div
		bind:this={elemGrid}
		use:setButtons
		class="snap-x snap-mandatory scroll-smooth flex pb-2 gap-4 overflow-x-auto"
	>
		{#each items as item}
			{#if item?.key}
				<article class="shrink-0 w-full sm:w-[200px] snap-start transition-transform">
					<a href="{base}/item/{item.key}">
						<figure>
							<div
								class="{item.holding_institution === 'SLA'
									? 'bg-primary-500 text-primary-500'
									: 'bg-tertiary-500 text-tertiary-500'} hover:brightness-110 relative
								placeholder-circle animate-pulse h-[250px]"
							>
								{#if item.iiif}
									<!-- region/size/rotation/quality.format
								cut 10% of the border of the image, make it 200px wide, don't turn it-->
									<img
										class="z-20 mx-auto h-full object-contain"
										src="{item.iiif.replace('info.json', '')}pct:5,5,90,90/200,/0/default.jpg"
										alt={item.title}
										width="200"
										loading="lazy"
										use:setClasses
										on:load={(/** @type {{ target: HTMLImageElement; }} */ e) => {
											setClasses(e.target);
										}}
									/>
									{#if item.ext_num}
										<p
											class="absolute right-0 bottom-0 px-2 bg-surface-backdrop-token text-on-surface-token"
										>
											{item.ext_num} <span class="sr-only">Seiten</span>
										</p>
									{/if}
								{:else}
									<img
										class="z-20 mx-auto h-full object-contain"
										src="https://dummyimage.com/600x800/999395/ffffff.jpg&text={item.signature}"
										alt={item.title}
										width="200"
										loading="lazy"
										use:setClasses
										on:load={(/** @type {{ target: HTMLImageElement; }} */ e) => {
											setClasses(e.target);
										}}
									/>
								{/if}
							</div>
							<figcaption>{item.title} [{item.date}]</figcaption>
						</figure>
					</a>
				</article>
			{/if}
		{/each}
	</div>
	{#if showButtons}
		<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
			<i class="fa-solid fa-arrow-right" />
		</button>
	{/if}
</div>
