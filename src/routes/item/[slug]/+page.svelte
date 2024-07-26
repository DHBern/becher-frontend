<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import Map from '$lib/components/Map.svelte';
	import { onMount } from 'svelte';
	import { assets, base } from '$app/paths';
	import { popup } from '@skeletonlabs/skeleton';

	/**
	 * @type {import('openseadragon') | undefined}
	 */
	let OpenSeadragon;

	/**
	 * @type {import('openseadragon').Viewer}
	 */
	let viewer;

	onMount(async () => {
		OpenSeadragon = (await import('openseadragon')).default;
		viewer = new OpenSeadragon.Viewer({
			id: 'viewer',
			prefixUrl: `${assets}/openseadragon-svg-icons/icons/`,
			navImages: {
				zoomIn: {
					REST: 'zoomin_rest.svg',
					GROUP: 'zoomin_grouphover.svg',
					HOVER: 'zoomin_hover.svg',
					DOWN: 'zoomin_pressed.svg'
				},
				next: {
					REST: 'next_rest.svg',
					GROUP: 'next_grouphover.svg',
					HOVER: 'next_hover.svg',
					DOWN: 'next_pressed.svg'
				},
				previous: {
					REST: 'previous_rest.svg',
					GROUP: 'previous_grouphover.svg',
					HOVER: 'previous_hover.svg',
					DOWN: 'previous_pressed.svg'
				},
				fullpage: {
					REST: 'fullpage_rest.svg',
					GROUP: 'fullpage_grouphover.svg',
					HOVER: 'fullpage_hover.svg',
					DOWN: 'fullpage_pressed.svg'
				},
				home: {
					REST: 'home_rest.svg',
					GROUP: 'home_grouphover.svg',
					HOVER: 'home_hover.svg',
					DOWN: 'home_pressed.svg'
				},
				zoomOut: {
					REST: 'zoomout_rest.svg',
					GROUP: 'zoomout_grouphover.svg',
					HOVER: 'zoomout_hover.svg',
					DOWN: 'zoomout_pressed.svg'
				},
				rotateleft: {
					REST: 'rotateleft_rest.svg',
					GROUP: 'rotateleft_grouphover.svg',
					HOVER: 'rotateleft_hover.svg',
					DOWN: 'rotateleft_pressed.svg'
				},
				rotateright: {
					REST: 'rotateright_rest.svg',
					GROUP: 'rotateright_grouphover.svg',
					HOVER: 'rotateright_hover.svg',
					DOWN: 'rotateright_pressed.svg'
				},
				flip: {
					REST: 'flip_rest.svg',
					GROUP: 'flip_grouphover.svg',
					HOVER: 'flip_hover.svg',
					DOWN: 'flip_pressed.svg'
				}
			},
			sequenceMode: true
		});
	});

	/** @type {import('./$types').PageData} */
	export let data;

	$: {
		if (viewer && data.metadata['iiif-manifest']) {
			fetch(data.metadata['iiif-manifest'])
				.then((res) => res.json())
				.then((json) => {
					const iiif = json.sequences[0].canvases.map(
						(
							/** @type {{ images: { resource: { service: { [x: string]: any; }; }; }[]; }} */ canvas
						) => canvas.images[0].resource.service['@id']
					);
					viewer.open(iiif);
				});
		}
	}
</script>

<ContentContainer>
	<div class="md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] gap-4 lg:gap-6">
		{#if data.metadata}
			{@const d = data.metadata}
			{@const variant =
				d.holding_institution === 'SLA' ? 'variant-filled-primary' : 'variant-filled-tertiary'}
			{@const bg = d.holding_institution === 'SLA' ? 'bg-primary-500' : 'bg-tertiary-500'}
			<div class="md:col-span-2 lg:col-span-1 lg:col-start-2">
				<h1 class="h1 text-balance pb-2 md:pb-4 inline">
					{d.title}
				</h1>
				<span class="badge {variant}">{d.holding_institution}</span>
			</div>
			<div class="lg:row-span-2 lg:row-start-1 w-full h-fit {bg}">
				<div id="viewer" class="w-full h-[60vh]"></div>
			</div>
			<dl class="grid grid-cols-[1fr_4fr] justify-between h-fit">
				{#each data.structure.find((s) => s.type === d.type)?.fields || [] as { label, key }}
					{@const metadataVal = d[key]}
					{#if metadataVal}
						<dt class="border-r-4 border-current pr-4 pt-4">
							{label}
						</dt>
						<dd class="pl-2 pt-4">
							{#if Array.isArray(metadataVal)}
								{#each metadataVal as item, i}
									{#if typeof item === 'object'}
										{item.name}
										{#if item.additional && item.additional !== 'undefined'}
											({item.additional})
										{/if}

										{#if item.uri}
											&nbsp;<a
												title="nähere Informationen"
												class="anchor"
												href={item.uri}
												target="_blank"
												rel="noopener"
											>
												<i class="fa-solid fa-circle-info"></i>
												<span class="sr-only">nähere Informationen</span>
											</a>
										{/if}
										{#if item.coordinates && item.coordinates.length === 2}
											<a
												href="{base}/?map={JSON.stringify(item.coordinates)}"
												use:popup={{
													event: 'hover',
													target: `popupHover`,
													placement: 'left',
													middleware: {
														flip: {
															fallbackAxisSideDirection: 'start'
														}
													}
												}}
											>
												<Map
													data={{
														type: 'FeatureCollection',
														features: [
															{
																geometry: {
																	coordinates: item.coordinates,
																	type: 'point'
																},
																type: 'Feature',
																properties: {
																	placename: item.name
																}
															}
														]
													}}
													center={item.coordinates}
													standardControls={false}
													className="h-[300px]"
													interactive={false}
													zoom={5}
												/>
											</a>
											<div
												class="card p-4 !bg-secondary-500 text-primary-500 max-w-96"
												data-popup={`popupHover`}
											>
												<p>zur Kartenansicht</p>
												<div class="arrow !bg-secondary-500" />
											</div>
										{/if}
									{:else}
										{item}
									{/if}

									{#if i !== metadataVal.length - 1}
										<br />
									{/if}
								{/each}
							{:else if typeof metadataVal === 'object'}
								{metadataVal.name}
								{#if metadataVal.uri}
									&nbsp;<a
										title="nähere Informationen"
										class="anchor"
										href={metadataVal.uri}
										target="_blank"
										rel="noopener"
									>
										<i class="fa-solid fa-circle-info"></i>
										<span class="sr-only">nähere Informationen</span>
									</a>
								{/if}
							{:else}
								{metadataVal}
							{/if}
						</dd>
					{/if}
				{/each}
				{#each Object.entries(d['links']) as link}
					{@const [key, url] = link}
					{@const label = data.linkstructure.find((s) => s.key === key)?.label}
					<dt class="border-r-4 border-current pr-4 pt-4">{label ?? key}</dt>
					<dd class="pl-2 pt-4">
						<a class="anchor" href={url} target="_blank" rel="noopener">{url}</a>
						{#if key === 'gnd' || key === 'helveticArchives'}
							<span>[{d.category_local_name}]</span>
						{/if}
					</dd>
				{/each}
			</dl>
			<a class="anchor col-start-2" href="{base}/related-tests?s={d.key}"
				>Zum Ähnlichkeitsvergleich (Testseite) für dieses Katalogisat</a
			>
		{/if}
	</div>
</ContentContainer>
{#if data.related[0].length}
	<ContentContainer dark>
		<h2 class="h2">Verwandte Katalogisate (basierend auf Werknormdaten)</h2>
		<OneRow items={data.related[0]} />
	</ContentContainer>
{/if}
{#if data.related[1]?.length}
	<ContentContainer dark>
		<h2 class="h2">Verwandte Katalogisate (basierend auf Bestandesstruktur)</h2>
		<OneRow items={data.related[1]} />
	</ContentContainer>
{/if}
