<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ContentContainer>
	image
	<h1 class="h1">{data.id}</h1>
	<dl>
		<dt>Datierung</dt>
		<dd>9999</dd>
	</dl>
</ContentContainer>
<ContentContainer></ContentContainer>
