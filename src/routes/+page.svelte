<script>
	import Map from '$lib/components/Map.svelte';
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import Grid from '$lib/components/Grid.svelte';
	import {
		RecursiveTreeView,
		SlideToggle,
		RadioGroup,
		RadioItem,
		popup,
		TabGroup,
		Tab
	} from '@skeletonlabs/skeleton';
	import MiniSearch from 'minisearch';
	import { miniSearch } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';

	/**
	 * @type {string[]}
	 */
	let checkedNodes;

	export let data;

	const uniqueKeys = [...new Set(data.allFields?.map((i) => i.key))];

	let allDocumentsAdded = Promise.resolve();

	/** @type {[number,number]} */
	let flyTo = [10, 15];
	let zoom = 1.1;

	onMount(() => {
		if (!$miniSearch) {
			const CUSTOM_SPACE_OR_PUNCT =
				/[\n\r -#%-*,./:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;

			$miniSearch = new MiniSearch({
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
				idField: 'key', // document property to use as id field
				tokenize: (text) => text.split(CUSTOM_SPACE_OR_PUNCT),
				searchOptions: {
					weights: { fuzzy: 0.3, prefix: 0.2 }
				}
			});
			allDocumentsAdded = new Promise((resolve) => {
				$miniSearch.addAllAsync(data.items, { chunkSize: 4000 }).then(() => {
					console.log($miniSearch.documentCount + ' documents added');
					resolve();
				});
			});
		} else if ($miniSearch.documentCount <= 1) {
			allDocumentsAdded = new Promise((resolve) => {
				$miniSearch.addAllAsync(data.items, { chunkSize: 4000 }).then(() => {
					console.log('all documents added');
					resolve();
				});
			});
		} else {
			allDocumentsAdded = Promise.resolve();
		}
	});
	afterNavigate(() => {
		if ($page.url.searchParams.size !== 0) {
			if ($page.url.searchParams.has('s')) {
				// @ts-ignore
				searchtext = $page.url.searchParams.get('s');
			} else if ($page.url.searchParams.has('a')) {
				advancedToggle = true;
				// @ts-ignore
				advancedFields = JSON.parse($page.url.searchParams.get('a'));
			}

			if ($page.url.searchParams.has('c')) {
				// @ts-ignore
				checkedNodes = JSON.parse($page.url.searchParams.get('c'));
			}

			if ($page.url.searchParams.has('map')) {
				tabSet = 1;
				zoom = 6;
				// @ts-ignore
				flyTo = JSON.parse($page.url.searchParams.get('map'));
				console.log('scrolling to map');
				// @ts-ignore
				document.querySelector('.tab-group').scrollIntoView(true);
			} else if ($page.url.searchParams.has('t')) {
				// @ts-ignore
				tabSet = parseInt($page.url.searchParams.get('t'));
			}

			// delete all searchParams from url
			$page.url.searchParams.forEach((_value, key) => {
				$page.url.searchParams.delete(key);
			});
			history.replaceState(null, '', $page.url.toString());
		}
	});

	/** @type {import('./$types').Snapshot<{searchtext: string | import('minisearch').Query, checkedNodes:string[], tabSet: 0|1|2, advancedToggle: boolean, advancedFields: { [key: string]: string; }}>} */
	export const snapshot = {
		capture: () => {
			return { searchtext, checkedNodes, advancedToggle, advancedFields, tabSet };
		},
		restore: (value) => {
			advancedFields = value.advancedFields;
			searchtext = value.searchtext;
			advancedToggle = value.advancedToggle;
			tabSet = value.tabSet;
			checkedNodes = value.checkedNodes;
		}
	};

	/** @type {Number} */
	let minDate = 1910;
	/** @type {Number} */
	let maxDate = 1995;

	function dateFilter(/** @type {any} */ item) {
		if (!item.date_reg[0]) {
			return false;
		}
		const date = parseInt(item.date_reg[0].substring(0, 4));
		return date >= minDate && date <= maxDate;
	}

	$: searchConfig = {
		prefix: (/** @type {string} */ term) => term.length <= 6,
		fuzzy: (
			/** @type {string} */ term,
			/** @type {Number} */ _i,
			/** @type {string[]}*/ _terms
		) => {
			if (/\d{4}/.test(term)) {
				return false;
			}
			return 0.2;
		},
		boost: { title: 2, date_reg: 2 },
		filter: minDate !== 1910 || maxDate !== 1995 ? dateFilter : undefined
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
			allDocumentsAdded.then(() => {
				const searchresults = $miniSearch.search(query, config);
				resolve(searchresults);
			});
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
				filtereditems = data.items.filter((item) => {
					// filter all items for checked categories
					if (checkedNodes.includes(item.category.toString())) {
						if (minDate !== 1910 || maxDate !== 1995) {
							return dateFilter(item);
						} else {
							return true;
						}
					} else {
						return false;
					}
				});
			}
		} else if (searchtext) {
			// filter all items for search results
			asyncSearch(searchtext, searchConfig).then((results) => {
				filtereditems = results;
			});
		} else {
			filtereditems =
				minDate !== 1910 || maxDate !== 1995 ? data.items.filter(dateFilter) : data.items;
		}
	}

	$: filteredGeo = {
		...data.geo,
		features: data.geo.features.filter((i) =>
			filtereditems.some((j) => i.properties.links.some((k) => k.key === j.key))
		)
	};

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

	/** @type {0 | 1 | 2} */
	let tabSet = 0;
</script>

<ContentContainer
	class="h-[376px] sm:h-[223px] lg:h-[345px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_max-content]"
	dark
>
	<div class="z-10 col-span-full md:col-span-1 row-start-1">
		<h1 class="h1 my-16">Ulrich Becher Digital</h1>
		<p class="p lg:text-xl">
			Virtuell zusammengeführte Teilnachlässe des Deutschen Exilarchivs 1933-1945 und des
			Schweizerischen Literaturarchivs
		</p>
	</div>
	<div class="col-start-1 sm:col-start-2 row-span-2 row-start-1">
		<enhanced:img
			class="relative float-right sm:w-[150px] lg:w-[222px]"
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
				<h4 class="h4 mt-4">Datumsbereich</h4>
				<div class="grid grid-cols-[1fr_auto] gap-4 mt-4">
					<label transition:slide>
						<input
							type="range"
							min="1910"
							max="1995"
							bind:value={minDate}
							on:input={() => {
								if (minDate > maxDate) {
									maxDate = minDate;
								}
							}}
						/>
					</label>
					<p>ab: {minDate}</p>
				</div>
				<div class="grid grid-cols-[1fr_auto] gap-4 mt-4">
					<label transition:slide>
						<input
							type="range"
							min="1910"
							max="1995"
							bind:value={maxDate}
							on:input={() => {
								if (maxDate < minDate) {
									minDate = maxDate;
								}
							}}
						/>
					</label>
					<p>bis: {maxDate}</p>
				</div>
			{:else}
				{#each uniqueKeys.filter((i) => i !== 'category_global_name') as item, i}
					{@const fields = data.allFields?.filter((f) => f.key === item)}
					{@const fieldInfo = fields?.map((i) => i.info).join(' / ')}
					<label class="label" transition:slide|global>
						<span>
							{fields?.map((i) => i.label).join(', ')}
						</span>
						{#if fieldInfo}
							<input
								class="input text-primary-500 p-6 placeholder-primary-500"
								type="text"
								bind:value={advancedFields[item]}
								use:popup={{
									event: 'focus-blur',
									target: `popupFocusBlur-${i}`,
									placement: 'left',
									middleware: {
										flip: {
											fallbackAxisSideDirection: 'start'
										}
									}
								}}
							/>
							<div
								class="card p-4 !bg-secondary-500 text-primary-500 max-w-96"
								data-popup={`popupFocusBlur-${i}`}
							>
								<p>{fieldInfo}</p>
								<div class="arrow !bg-secondary-500" />
							</div>
						{:else}
							<input
								class="input text-primary-500 p-6 placeholder-primary-500"
								type="text"
								bind:value={advancedFields[item]}
							/>
						{/if}
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
	<h3 class="h3">Zugänge</h3>
	<TabGroup>
		<Tab bind:group={tabSet} name="tab0" value={0}>Katalogisate</Tab>
		<Tab bind:group={tabSet} name="tab1" value={1}>Karte</Tab>
		<Tab bind:group={tabSet} name="tab2" value={2}>Ähnlichkeit</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Grid items={filtereditems} />
			{:else if tabSet === 1}
				<Map data={filteredGeo} {zoom} center={flyTo}></Map>
			{:else if tabSet === 2}
				<iframe
					src="https://dhbern.github.io/vikus-viewer/"
					class="w-full h-[600px]"
					title="vikus-viewer"
					allow="fullscreen"
				></iframe>
			{/if}
		</svelte:fragment>
	</TabGroup>
</ContentContainer>
