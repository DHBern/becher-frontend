<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import itemData from '$lib/becher_full_json.json';

	/** @type {import('./$types').PageData} */
	export let data;

	let search = '';

	async function doSearch(event) {
		event.preventDefault();
		const found = structuredClone(data.csv.find((row) => row.id.slice(1, -1) === search));
		delete found.id;
		results = found;
	}

	let results = {};
</script>

<ContentContainer class="max-w-lg">
	<form on:submit={doSearch}>
		<label for="search" class="label">Suche:</label>
		<div class="flex gap-4">
			<input type="text" id="search" name="search" class="input" bind:value={search} />
			<button class="btn variant-filled-primary" type="submit">Suchen</button>
		</div>
	</form>
</ContentContainer>

{#each Object.entries(results) as [key, value]}
	{@const items = value
		.replaceAll('"', '')
		.split(',')
		.map((id) => itemData.find((item) => item.key === id))}
	<ContentContainer>
		<h2 class="h2">{key}</h2>
		<OneRow {items} />
	</ContentContainer>
{/each}
