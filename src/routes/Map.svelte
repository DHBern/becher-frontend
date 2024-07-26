<script>
	import { MapLibre, GeoJSON, CircleLayer, SymbolLayer, Popup } from 'svelte-maplibre';
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import MapPopup from './MapPopup.svelte';

	export let data;

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

<MapLibre
	center={[10, 50.5]}
	zoom={4.7}
	class="map h-[600px]"
	standardControls
	style="https://api.maptiler.com/maps/b5479c2c-728c-4a4f-a482-b575c9ea335f/style.json?key={PUBLIC_MAPTILER_KEY}"
>
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
			hoverCursor="pointer"
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
			<Popup openOn="click" closeOnClickOutside let:features>
				<MapPopup feature={features?.[0]} />
			</Popup>
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
