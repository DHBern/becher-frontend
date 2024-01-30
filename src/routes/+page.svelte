<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import RelatedItems from '$lib/components/RelatedItems.svelte';
	import { RecursiveTreeView } from '@skeletonlabs/skeleton';
	import MiniSearch from 'minisearch';

	/**
	 * @type {string[]}
	 */
	let checkedNodes;

	export let data;

	let miniSearch = new MiniSearch({
		fields: ['title', 'text'], // fields to index for full-text search
		storeFields: ['title', 'category'] // fields to return with search results
	});
	//miniSearch.addAll(data.items);
	/**
	 * @type {{date: string, signature: string, key: string, iiif: string, ext: number, holding_institution: string, title: string, category: number}[]} filtereditems
	 */
	$: filtereditems = data.items.filter((item) => {
		if (checkedNodes && checkedNodes.length > 0) {
			return checkedNodes.includes(item.category.toString());
		}
		return true;
	});
</script>

<ContentContainer
	class="h-[223px] lg:h-[345px] grid grid-cols-2 md:grid-cols-[1fr_max-content]"
	dark
>
	<div class="z-10 col-span-full md:col-span-1 row-start-1">
		<h1 class="h1 my-16">Ulrich Becher Digital</h1>
		<p class="p lg:text-xl">
			digitale Sammlung zum Werk Ulrich Bechers im Schweizerischen Literaturarchiv und im Deutschen
			Exilarchiv, Frankfurt
		</p>
	</div>
	<div class="col-start-2 row-span-2 row-start-1">
		<enhanced:img
			class="relative float-right w-[150px] lg:w-[222px]"
			src="$lib/assets/nachexil-basel.png?w=222"
			alt="Ulrich Becher in Basel"
		/>
	</div>
</ContentContainer>
<ContentContainer dark>
	<h2 class="h2 mb-4">Virtueller Katalog</h2>

	<div class="flex flex-col md:flex-row justify-between">
		<RecursiveTreeView
			selection
			multiple
			relational
			nodes={data.categories}
			bind:checkedNodes
			class="mb-4 md:mb-0"
			width="w-auto"
		/>
		<form class="relative">
			<label>
				<input
					class="input text-primary-500 p-6 placeholder-primary-500"
					type="text"
					placeholder="Dies ist der Suchtext..."
				/>
			</label>

			<h3 class="h3 m-3">Suchen in</h3>
			<div class="text-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ml-6 sm:ml-0">
				{#each data.itemstructure.map((i) => i.label) as text}
					<div>
						<label class="flex items-center">
							<input class="checkbox m-2 lg:m-5" type="checkbox" />
							<p>{text}</p>
						</label>
					</div>
				{/each}
			</div>

			<p class="md:absolute mt-3 bottom-0">
				es werden {filtereditems.length} Elemente angezeigt. {filtereditems.filter(
					(i) => i.holding_institution === 'SLA'
				).length} aus dem <span class="bg-primary-500 text-on-primary-token px-1">SLA</span>, {filtereditems.filter(
					(i) => i.holding_institution === 'DEA'
				).length} aus dem <span class="bg-tertiary-500 text-on-tertiary-token px-1">DEA</span>
			</p>
		</form>
	</div>
</ContentContainer>
<ContentContainer>
	<Grid items={filtereditems} />
</ContentContainer>

<style lang="postcss">
</style>
