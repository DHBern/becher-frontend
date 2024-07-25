<script>
	import { mapContext } from '$lib/context.js';
	import { base } from '$app/paths';

	const { map, source } = mapContext();

	export let feature;

	/**
	 * @type {any[]}
	 */
	let innerFeatures = [];
	$: if ($map && $source && feature && feature.properties.cluster) {
		$map
			?.getSource($source)
			?.getClusterLeaves(feature.properties.cluster_id, 10000, 0)
			.then((/** @type {any[]} */ features) => {
				innerFeatures = features;
			});
	} else {
		innerFeatures = [
			{ ...feature, properties: { foreign_becher: JSON.parse(feature.properties.foreign_becher) } }
		];
	}
</script>

<div class="max-h-44 overflow-y-scroll">
	{#each innerFeatures as feature}
		{@const props = feature?.properties.foreign_becher}
		<strong><a href={props?.gnd} target="_blank">{props?.placename}</a></strong>
		<ul>
			{#each props.links as link}
				<li><a href="{base}/item/{link.key}" target="_blank">{link.title}</a></li>
			{/each}
		</ul>
	{/each}
</div>
