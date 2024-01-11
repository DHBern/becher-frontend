<script>
	/**
	 * @type {{date: string, signature: string, holding_institution: string, title: string, category: number}[]}
	 */
	export let items = [];
</script>

<div class="grid pt-8">
	{#each items as item}
		<article class="py-3">
			<a href="/item/{item.signature}">
				<figure>
					<div class="bg-{item.holding_institution === 'SLA' ? 'primary' : 'tertiary'}-500">
						<enhanced:img src="$lib/assets/placeholder.jpg?w=300" class="mx-auto"></enhanced:img>
					</div>
					<figcaption>{item.title} [{item.date}]</figcaption>
				</figure>
			</a>
		</article>
	{/each}
</div>
