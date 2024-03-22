<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import { RecursiveTreeView, SlideToggle, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import MiniSearch from 'minisearch';
	import { slide } from 'svelte/transition';

	/**
	 * @type {string[]}
	 */
	let checkedNodes;

	export let data;

	const uniqueKeys = [...new Set(data.allFields.map((i) => i.key))];

	let miniSearch = new MiniSearch({
		fields: [...uniqueKeys, 'holding_institution'], // fields to index for full-text search
		storeFields: [
			'key',
			'date',
			'ext',
			'title',
			'iiif',
			'holding_institution',
			'category',
			'signature'
		], // fields to return with search results
		idField: 'key' // document property to use as id field
	});
	miniSearch.addAll(data.items);
	const searchConfig = {
		prefix: (/** @type {string} */ term) => term.length <= 6,
		fuzzy: 0.2,
		boost: { title: 2 }
	};

	/**
	 * @type {string|import('minisearch').Query}
	 */
	let searchtext = '';
	let advancedToggle = false;
	/** @type {{ [key: string]: string }} */
	let advancedFields = {};

	const asyncSearch = (
		/** @type {import("minisearch").Query} */ query,
		/** @type {import("minisearch").SearchOptions | undefined} */ config
	) => {
		return new Promise((resolve) => {
			const searchresults = miniSearch.search(query, config);
			console.log('searchresults', searchresults);
			resolve(searchresults);
		});
	};

	let filtereditems = data.items;
	$: {
		if (checkedNodes && checkedNodes.length > 0) {
			if (searchtext) {
				asyncSearch(searchtext, searchConfig).then((results) => {
					// filter all items for checked categories and search results
					filtereditems = results.filter(
						(/** @type {{ category: { toString: () => string; }; }} */ i) =>
							checkedNodes.includes(i.category.toString())
					);
				});
			} else {
				filtereditems = data.items.filter((item) =>
					// filter all items for checked categories
					checkedNodes.includes(item.category.toString())
				);
			}
		} else if (searchtext) {
			// filter all items for search results
			asyncSearch(searchtext, searchConfig).then((results) => {
				filtereditems = results;
			});
		} else {
			filtereditems = data.items;
		}
	}

	$: {
		if (advancedToggle) {
			if (Object.values(advancedFields).some((i) => !!i) || holdingInstitutionToggle) {
				searchtext = {
					combineWith: 'AND',
					queries: [
						...Object.keys(advancedFields).reduce(
							(/** @type {import('minisearch').Query[]} */ acc, key) => {
								if (advancedFields[key]) {
									acc.push({
										fields: [key],
										queries: [advancedFields[key]]
									});
								}
								return acc;
							},
							[]
						)
					]
				};
				if (holdingInstitutionToggle) {
					searchtext.queries.push({
						fields: ['holding_institution'],
						queries: [holdingInstitutionToggle]
					});
				}
			} else {
				searchtext = '';
			}
		}
	}
	/** @type { "DEA"|"SLA"|false }*/
	let holdingInstitutionToggle = false;
</script>

<ContentContainer
	class="h-[223px] lg:h-[345px] grid grid-cols-2 md:grid-cols-[1fr_max-content]"
	dark
>
	<div class="z-10 col-span-full md:col-span-1 row-start-1">
		<h1 class="h1 my-16">Ulrich Becher Digital</h1>
		<p class="p lg:text-xl">
			Virtuell zusammengeführte Teilnachlässe des Deutschen Exilarchivs 1933-1945 und des
			Schweizerischen Literaturarchivs
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
	<h2 class="h2 mb-4">Virtueller Bestand</h2>

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
		<div class="md:w-1/2">
			<div class="flex justify-between">
				<h3 class="h3 mb-3">Suche</h3>
				<SlideToggle
					name="advanced-mode"
					active="bg-tertiary-600"
					bind:checked={advancedToggle}
					class="mb-3"
					on:change={() => {
						searchtext = '';
					}}
				>
					{advancedToggle ? 'Einfach' : 'Erweitert'}
				</SlideToggle>
			</div>
			{#if !advancedToggle}
				<label transition:slide>
					<input
						class="input text-primary-500 p-6 placeholder-primary-500"
						type="text"
						placeholder="Dies ist der Suchtext..."
						bind:value={searchtext}
					/>
				</label>
			{:else}
				{#each uniqueKeys.filter((i) => i !== 'category_global_name') as item}
					<label class="label" transition:slide|global>
						<span>
							{data.allFields
								.filter((f) => f.key === item)
								.map((i) => i.label)
								.join(', ')}
						</span>
						<input
							class="input text-primary-500 p-6 placeholder-primary-500"
							type="text"
							bind:value={advancedFields[item]}
						/>
					</label>
				{/each}
				<div transition:slide|global>
					<RadioGroup active="variant-filled-secondary">
						<RadioItem bind:group={holdingInstitutionToggle} name="holdingInstitution" value={'DEA'}
							>DEA</RadioItem
						>
						<RadioItem
							bind:group={holdingInstitutionToggle}
							name="holdingInstitution"
							value={false}
						>
							<i class="fa-regular fa-object-group"></i>
						</RadioItem>
						<RadioItem bind:group={holdingInstitutionToggle} name="holdingInstitution" value={'SLA'}
							>SLA</RadioItem
						>
					</RadioGroup>
				</div>
			{/if}

			<p class="mt-5">
				Es werden {filtereditems.length} Elemente angezeigt. {filtereditems.filter(
					(i) => i.holding_institution === 'SLA'
				).length} aus dem <span class="bg-primary-500 text-on-primary-token px-1">SLA</span>, {filtereditems.filter(
					(i) => i.holding_institution === 'DEA'
				).length} aus dem <span class="bg-tertiary-500 text-on-tertiary-token px-1">DEA</span>
			</p>
		</div>
	</div>
</ContentContainer>
<ContentContainer>
	<Grid items={filtereditems} />
</ContentContainer>
