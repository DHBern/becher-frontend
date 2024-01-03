<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import RelatedItems from '$lib/components/RelatedItems.svelte';
	import { nodes } from '$lib/treeContent';
	import { RecursiveTreeView } from '@skeletonlabs/skeleton';

	/**
	 * @type {string[]}
	 */
	const searchFilterArray = [
		'Titel',
		'Signatur',
		'Datierung',
		'Author',
		'Ort',
		'Beschreibung',
		'SLA',
		'DEA'
	];

	/**
	 * @type {string[]}
	 */
	let checkedNodes;
	/**
	 * @type {string[]}
	 */
	let indeterminateNodes;
</script>

<ContentContainer
	class="h-[223px] lg:h-[345px] grid grid-cols-2 md:grid-cols-[1fr_max-content]"
	dark
>
	<div class="z-50 col-span-full md:col-span-1 row-start-1">
		<h1 class="h1 my-16">Ulrich Becher Digital</h1>
		<p class="p lg:text-xl">
			digitale Sammlung zum Werk Ulrich Bechers im Schweizerischen Literaturarchiv und im Deutschen
			Exilarchiv, Frankfurt
		</p>
	</div>
	<div class="col-start-2 row-span-2 row-start-1">
		<enhanced:img
			class="z-49 relative float-right w-[150px] lg:w-[222px]"
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
			{nodes}
			bind:checkedNodes
			bind:indeterminateNodes
			class="mb-4 md:mb-0"
			width="w-auto"
		/>
		<form>
			<label>
				<input
					class="input text-primary-500 p-6 placeholder-primary-500"
					type="text"
					placeholder="Dies ist der Suchtext..."
				/>
			</label>

			<RelatedItems array={searchFilterArray} />
		</form>
	</div>
</ContentContainer>
<ContentContainer>
	<p>es werden 16 Elemente angezeigt. 13 aus dem SLA, 3 aus dem DEA</p>
	grid
</ContentContainer>

<style lang="postcss">
</style>
