<script>
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { base } from '$app/paths';

	/**
	 * @type {{date: string, signature: string, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];
</script>

<VirtualScroll data={items} key="signature" let:data>
	<article class="hover:scale-125 transition-transform">
		<a href="{base}/item/{data.signature}">
			<figure>
				<div class="bg-{data.holding_institution === 'SLA' ? 'primary' : 'tertiary'}-500">
					<enhanced:img
						src="$lib/assets/placeholder.jpg?w=300"
						class="mx-auto"
						alt="digitales Faksimile"
					></enhanced:img>
				</div>
				<figcaption class="bg-surface-900">{data.title} [{data.date}]</figcaption>
			</figure>
		</a>
	</article>
</VirtualScroll>

<style>
	:global(.virtual-scroll-wrapper) {
		@apply grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-8;
	}
</style>
