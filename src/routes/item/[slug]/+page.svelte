<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import { onMount } from 'svelte';

	/**
	 * @type {typeof import('openseadragon').default}
	 */
	let OpenSeadragon;
	/**
	 * @type {OpenSeadragon.Viewer}
	 */
	let viewer;

	onMount(async () => {
		OpenSeadragon = await import('openseadragon');
	});

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @param {HTMLDivElement} _node
	 */
	function setsource(_node) {
		data.metadata.then(async (metadata) => {
			if (viewer) {
				viewer.destroy();
			}

			const iiif = // @ts-ignore
				(await (await fetch(metadata.default['iiif-manifest'])).json()).sequences[0].canvases.map(
					(
						/** @type {{ images: { resource: { service: { [x: string]: any; }; }; }[]; }} */ canvas
					) => canvas.images[0].resource.service['@id']
				);

			viewer = new OpenSeadragon.Viewer({
				id: 'viewer',
				prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
				tileSources: iiif,
				sequenceMode: true
			});

			return () => {
				viewer.destroy();
			};
		});
	}
</script>

<ContentContainer>
	<div class="md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] gap-4 lg:gap-6">
		{#await data.metadata then metadata}
			{@const d = metadata?.default}
			{@const variant = d.holding_institution === 'SLA' ? 'primary' : 'tertiary'}
			<div class="md:col-span-2 lg:col-span-1 lg:col-start-2">
				<h1 class="h1 text-balance pb-2 md:pb-4 inline">
					{d.title}
				</h1>
				<span class="badge variant-filled-{variant}">{d.holding_institution}</span>
			</div>
			<div class="lg:row-span-2 lg:row-start-1 w-full h-fit bg-{variant}-500">
				<div use:setsource id="viewer" class="w-full h-[60vh]"></div>
			</div>
			<dl class="grid grid-cols-[1fr_4fr] justify-between">
				{#each Object.entries(d) as [key, value]}
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
