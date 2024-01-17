<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ContentContainer>
	image
	<h1 class="h1">{data.key}</h1>
	{#await data.metadata then metadata}
		{JSON.stringify(metadata)}
	{/await}
	<dl>
		<dt>x</dt>
		<dd>y</dd>
	</dl>
</ContentContainer>
<ContentContainer dark>
	<h2 class="h2">Verwandte Katalogisate</h2>
	<OneRow items={data.related} />
</ContentContainer>
