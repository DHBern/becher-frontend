<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: console.log(data?.metadata);
</script>

<ContentContainer>
	<div class="md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] gap-4 lg:gap-6">
		{#await data.metadata then metadata}
			<h1 class="h1 text-balance md:col-span-2 lg:col-span-1 lg:col-start-2 pb-2 md:pb-4">
				{metadata.default?.title}
			</h1>
			<div
				class="lg:row-span-2 lg:row-start-1 w-full h-fit bg-{metadata?.default
					?.holding_institution === 'SLA'
					? 'primary'
					: 'tertiary'}-500"
			>
				<enhanced:img
					src="$lib/assets/placeholder.jpg"
					class="max-h-[60vh] w-auto mx-auto"
					alt="Ulrich Becher"
				/>
			</div>
			<dl class="grid grid-cols-[1fr_4fr] justify-between">
				{#each Object.entries(metadata.default) as [key, value]}
					<dt class="border-r-4 border-current pr-4 pt-4">{key}</dt>
					<dd class="pl-2 pt-4">{value}</dd>
				{/each}
			</dl>
		{/await}
	</div>
</ContentContainer>
<ContentContainer dark>
	<h2 class="h2">Verwandte Katalogisate</h2>
	<OneRow items={data.related} />
</ContentContainer>
