<script>
	import { base } from '$app/paths';

	/**
	 * @type {{date: string, signature: string, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 pt-8">
	{#each items as item (item.signature)}
		<article class="hover:scale-125 transition-transform">
			<a href="{base}/item/{item.signature}">
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
