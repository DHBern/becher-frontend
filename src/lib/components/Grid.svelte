<script>
	import { base } from '$app/paths';

	/** @type {Omit<import('$lib/itemtype.ts').Item, 'prototype'>[]} */
	export let items = [];

	let className = '';
	export { className as class };

	const setClasses = (/** @type {HTMLImageElement} */ e, force = false) => {
		if (e.complete || force) {
			e.classList.add('border-4', 'border-current');
			// @ts-ignore
			e.parentElement.classList.remove('animate-pulse', 'placeholder-circle');
		}
	};

	/**
	 * @type IntersectionObserver
	 */
	let intersectionObserver;

	function ensureIntersectionObserver() {
		if (intersectionObserver) return;

		intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
				entry.target.dispatchEvent(new CustomEvent(eventName));
			});
		});
	}

	/**
	 *
	 * Function that creates an IntersectionObserver instance and observes the element
	 *
	 * @param element {HTMLElement}
	 * @param abort {boolean}
	 */
	function viewport(element, abort) {
		// we only want the observer on the last Element, so we abort all but the last one i !== visibleItems.length - 1
		if (abort) return;
		ensureIntersectionObserver();

		intersectionObserver.observe(element);

		return {
			destroy() {
				intersectionObserver.unobserve(element);
			}
		};
	}

	let visibleNumber = 30;
	$: visibleItems = items.slice(0, visibleNumber);
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-8 {className}">
	{#each visibleItems as item, i (item.key)}
		<article class="hover:brightness-110">
			<a href="{base}/item/{item.key}">
				<figure class="">
					<div
						class="{item.holding_institution === 'SLA'
							? 'bg-primary-500 text-primary-500'
							: 'bg-tertiary-500 text-tertiary-500'} relative
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
									setClasses(e.target, true);
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
									setClasses(e.target, true);
								}}
							/>
						{/if}
					</div>
					<figcaption class="bg-surface-900">{item.title} [{item.date}]</figcaption>
				</figure>
			</a>
		</article>
	{/each}
</div>
{#if items.length > visibleNumber}
	<button
		type="button"
		class="btn variant-filled-primary mx-auto block"
		on:click={() => (visibleNumber = visibleNumber + Math.min(30, items.length - visibleNumber))}
		>Mehr anzeigen</button
	>
{/if}
