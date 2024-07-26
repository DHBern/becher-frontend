<script>
	import { MapLibre, GeoJSON, CircleLayer, SymbolLayer, Popup } from 'svelte-maplibre';
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import MapPopup from '$lib/components/MapPopup.svelte';

	export let data;

	/** @type {[number, number]} */
	export let center = [10, 15];
	export let zoom = 1.1;
	export let standardControls = true;
	export let className = 'h-[600px]';
	export let style = `https://api.maptiler.com/maps/b5479c2c-728c-4a4f-a482-b575c9ea335f/style.json?key=${PUBLIC_MAPTILER_KEY}`;
	export let interactive = true;
	/**
	 * @param {string} varName
	 */
	function getHexFromVar(varName) {
		// @ts-ignore
		const rgbArray = getComputedStyle(document.querySelector('.map'))
			.getPropertyValue(varName)
			.match(/\d+/g);

		if (!rgbArray || rgbArray.length < 3) {
			return '#000000';
		}

		return (
			'#' +
			((1 << 24) | (Number(rgbArray[0]) << 16) | (Number(rgbArray[1]) << 8) | Number(rgbArray[2]))
				.toString(16)
				.slice(1)
		);
	}
</script>

<MapLibre {center} {zoom} class="map {className}" {standardControls} {style} {interactive}>
	<GeoJSON
		id="items"
		{data}
		cluster={{
			radius: 450,
			maxZoom: 14,
			properties: {
				total_links: ['+', ['length', ['array', ['get', 'links']]]]
			}
		}}
	>
		<CircleLayer
			id="items"
			applyToClusters
			paint={{
				'circle-color': getHexFromVar('--color-tertiary-600'),
				'circle-radius': ['interpolate', ['linear'], ['get', 'total_links'], 5, 7, 300, 60],
				'circle-stroke-color': getHexFromVar('--color-primary-800'),
				'circle-stroke-width': 1,
				'circle-stroke-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0, 1]
			}}
			manageHoverState
		>
			<Popup openOn="click" closeOnClickOutside let:features>
				<MapPopup feature={features?.[0]} />
			</Popup>
		</CircleLayer>
		<SymbolLayer
			id="cluster_labels"
			interactive={false}
			applyToClusters
			layout={{
				'text-field': [
					'format',
					['get', 'total_links'],
					{
						'text-color': getHexFromVar('--on-tertiary')
					}
				],
				'text-size': 12
			}}
		/>

		<CircleLayer
			id="objects_circle"
			applyToClusters={false}
			hoverCursor={interactive ? 'pointer' : 'default'}
			paint={{
				'circle-color': getHexFromVar('--color-tertiary-600'),
				'circle-radius': [
					'interpolate',
					['linear'],
					['length', ['array', ['get', 'links']]],
					5,
					7,
					300,
					60
				],
				'circle-stroke-color': getHexFromVar('--color-primary-800'),
				'circle-stroke-width': 1
			}}
		>
			{#if interactive}
				<Popup openOn="click" closeOnClickOutside let:features>
					<MapPopup feature={features?.[0]} />
				</Popup>
			{/if}
		</CircleLayer>
		<SymbolLayer
			id="labels"
			applyToClusters={false}
			interactive={false}
			layout={{
				'text-field': [
					'format',
					['number-format', ['length', ['array', ['get', 'links']]], {}],
					{
						'text-color': getHexFromVar('--on-tertiary')
					}
				],
				'text-size': 12
			}}
		/>
	</GeoJSON>
</MapLibre>
