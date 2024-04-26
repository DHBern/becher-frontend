<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';

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
					{#if d[key]}
						<dt class="border-r-4 border-current pr-4 pt-4">
							{label}
						</dt>
						<dd class="pl-2 pt-4">
							{#if Array.isArray(d[key])}
								{#each d[key] as item, i}
									{#if key === 'wit-info'}
										test
									{:else}
										{item}
										{#if d[`${key}_uri`]?.[i]}
											&nbsp;<a
												title="nähere Informationen"
												class="anchor"
												href={d[`${key}_uri`][i]}
												target="_blank"
												rel="noopener"
											>
												<i class="fa-solid fa-circle-info"></i>
												<span class="sr-only">nähere Informationen</span>
											</a>
										{/if}
										{#if i !== d[key].length - 1}
											<br />
										{/if}
									{/if}
								{/each}
							{:else}
								{d[key]}
								{#if d[`${key}_uri`]}
									&nbsp;<a
										title="nähere Informationen"
										class="anchor"
										href={d[`${key}_uri`]}
										target="_blank"
										rel="noopener"
									>
										<i class="fa-solid fa-circle-info"></i>
										<span class="sr-only">nähere Informationen</span>
									</a>
								{/if}
							{/if}
						</dd>
					{/if}
				{/each}
				{#each Object.entries(d['links']) as link}
					{@const [label, url] = link}
					<dt class="border-r-4 border-current pr-4 pt-4">{label}</dt>
					<dd class="pl-2 pt-4">
						<a class="anchor" href={url} target="_blank" rel="noopener">{url}</a>
						{#if label === 'gnd' || label === 'helveticArchives'}
							<span>[{d.category_local_name}]</span>
						{/if}
					</dd>
				{/each}
			</dl>
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
