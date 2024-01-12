<script>
	import { base } from '$app/paths';

	/**
	 * @type {{date: string, signature: string, key: string, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];

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

<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-8">
	{#each visibleItems as item, i (item.key)}
		<article
			class="hover:scale-125 transition-transform"
			use:viewport={i !== visibleItems.length - 1}
			on:enterViewport={() => (visibleNumber = visibleNumber + 30)}
		>
			<a href="{base}/item/{item.key}">
				<figure>
					<div class="bg-{item.holding_institution === 'SLA' ? 'primary' : 'tertiary'}-500">
						<enhanced:img src="$lib/assets/placeholder.jpg?w=300" class="mx-auto"></enhanced:img>
					</div>
					<figcaption class="bg-surface-900">{item.title} [{item.date}]</figcaption>
				</figure>
			</a>
		</article>
	{/each}
</div>
