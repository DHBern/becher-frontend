<script>
	import { base } from '$app/paths';

	/**
	 * @type {{date: string, signature: string, key: string, iiif: string, ext: number, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];

	let className = '';
	export { className as class };

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
	 * @param element {HTMLElement}
	 * @param abort {boolean}
	 */
	function viewport(element, abort) {
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

<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 pt-8 {className}">
	{#each visibleItems as item, i (item.key)}
		<article
			class="hover:brightness-110"
			use:viewport={i !== visibleItems.length - 1}
			on:enterViewport={() => (visibleNumber = visibleNumber + 30)}
		>
			<a href="{base}/item/{item.key}">
				<figure>
					<div
						class="bg-{item.holding_institution === 'SLA' ? 'primary' : 'tertiary'}-500 relative"
					>
						<img
							src="{item.iiif.replace('info.json', '')}full/200,/0/default.jpg"
							alt={item.title}
							width="200"
						/>
						{#if item.ext}
							<p
								class="absolute right-0 bottom-0 px-2 bg-surface-backdrop-token text-on-surface-token"
							>
								{item.ext} <span class="sr-only">Seiten</span>
							</p>
						{/if}
					</div>
					<figcaption class="bg-surface-900">{item.title} [{item.date}]</figcaption>
				</figure>
			</a>
		</article>
	{/each}
</div>
