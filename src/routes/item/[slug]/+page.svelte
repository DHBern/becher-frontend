<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';

	/**
	 * @type {{ Viewer: any; default?: any; addClass?: (element: string | Element, className: string) => void; addEvent?: (element: string | Element, eventName: string, handler: (event: Event) => void, useCapture?: boolean | { capture?: boolean | undefined; passive?: boolean | undefined; once?: boolean | undefined; } | undefined) => void; cancelEvent?: (event?: import("openseadragon").OSDEvent<any> | undefined) => void; capitalizeFirstLetter?: (value: string) => string; createCallback?: (object: object, method: (...args: any[]) => void, ...args: any[]) => (...args: any[]) => void; delegate?: (object: object, method: (...args: any[]) => void) => (object: any, ...args: any[]) => void; eventIsCanceled?: (event: import("openseadragon").OSDEvent<any>) => boolean; extend?: () => any; getCssPropertyWithVendorPrefix?: (property: string) => string; getElement?: (element: string | Element) => Element; getElementOffset?: (element: string | Element) => import("openseadragon").Point; getElementPosition?: (element: string | Element) => import("openseadragon").Point; getElementSize?: (element: string | Element) => import("openseadragon").Point; getElementStyle?: (element: string | Element) => CSSStyleDeclaration; getViewer?: (element: Element) => import("openseadragon").Viewer; getMousePosition?: (event?: import("openseadragon").OSDEvent<any> | undefined) => import("openseadragon").Point; getPageScroll?: () => import("openseadragon").Point; getString?: (property: string) => string; getUrlParameter?: (key: string) => string; getWindowSize?: () => import("openseadragon").Point; imageFormatSupported?: (extension?: string | undefined) => boolean; indexOf?: (array: any[], searchElement: object, fromIndex?: number | undefined) => number; makeAjaxRequest?: (options: { url: string; success: (obj: object) => void; error: (obj: object) => void; headers: object; responseType: string; withCredentials?: boolean | undefined; }) => XMLHttpRequest; makeCenteredNode?: (element: string | Element) => Element; makeNeutralElement?: (tagName: string) => Element; makeTransparentImage?: (src: string) => Element; normalizeEventListenerOptions?: (options: boolean | { capture?: boolean | undefined; passive?: boolean | undefined; once?: boolean | undefined; }) => string; now?: () => number; parseJSON?: (string: string) => object; parseXml?: (string: string) => Document; pointInElement?: (element: string | Element, point: import("openseadragon").Point) => boolean; positiveModulo?: (number: number, modulo: number) => number; removeClass?: (element: string | Element, className: string) => void; removeEvent?: (element: string | Element, eventName: string, handler: import("openseadragon").EventHandler<any>, useCapture?: boolean | { capture?: boolean | undefined; } | undefined) => void; setElementOpacity?: (element: string | Element, opacity: number, usesAlpha?: boolean | undefined) => void; setElementPointerEvents?: (element: string | Element, value: string) => void; setElementPointerEventsNone?: (element: string | Element) => void; setElementTouchActionNone?: (element: string | Element) => void; setImageFormatsSupported?: (formats: { bmp?: boolean | undefined; jpeg?: boolean | undefined; jpg?: boolean | undefined; png?: boolean | undefined; tif?: boolean | undefined; wdp?: boolean | undefined; }) => void; setPageScroll?: (point: import("openseadragon").Point) => void; setString?: (property: string, value: string) => void; stopEvent?: (event?: import("openseadragon").OSDEvent<any> | undefined) => void; Browser?: typeof import("openseadragon").Browser; BROWSERS?: typeof import("openseadragon").BROWSERS; ButtonState?: typeof import("openseadragon").ButtonState; ControlAnchor?: typeof import("openseadragon").ControlAnchor; DEFAULT_SETTINGS?: any; fullScreenApi?: any; OverlayPlacement?: typeof import("openseadragon").OverlayPlacement; OverlayRotationMode?: typeof import("openseadragon").OverlayRotationMode; pixelDensityRatio?: number; Placement?: typeof import("openseadragon").Placement; supportsCanvas?: boolean; version?: { versionStr: string; major: number; minor: number; revision: number; }; Button?: typeof import("openseadragon").Button; ButtonGroup?: typeof import("openseadragon").ButtonGroup; Control?: typeof import("openseadragon").Control; ControlDock?: typeof import("openseadragon").ControlDock; DisplayRect?: typeof import("openseadragon").DisplayRect; Drawer?: typeof import("openseadragon").Drawer; DziTileSource?: typeof import("openseadragon").DziTileSource; IIIFTileSource?: typeof import("openseadragon").IIIFTileSource; ImageLoader?: typeof import("openseadragon").ImageLoader; ImageTileSource?: typeof import("openseadragon").ImageTileSource; LegacyTileSource?: typeof import("openseadragon").LegacyTileSource; MouseTracker?: typeof import("openseadragon").MouseTracker; GesturePointList?: typeof import("openseadragon").GesturePointList; Navigator?: typeof import("openseadragon").Navigator; OsmTileSource?: typeof import("openseadragon").OsmTileSource; Overlay?: typeof import("openseadragon").Overlay; Point?: typeof import("openseadragon").Point; Rect?: typeof import("openseadragon").Rect; ReferenceStrip?: typeof import("openseadragon").ReferenceStrip; Spring?: typeof import("openseadragon").Spring; Tile?: typeof import("openseadragon").Tile; TileCache?: typeof import("openseadragon").TileCache; TiledImage?: typeof import("openseadragon").TiledImage; TileSource?: typeof import("openseadragon").TileSource; TmsTileSource?: typeof import("openseadragon").TmsTileSource; Viewport?: typeof import("openseadragon").Viewport; World?: typeof import("openseadragon").World; ZoomifyTileSource?: typeof import("openseadragon").ZoomifyTileSource; }}
	 */
	let OpenSeadragon;

	/**
	 * @type {{ destroy: () => void; }}
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
				}
			},
			sequenceMode: true
		});
	});

	/** @type {import('./$types').PageData} */
	export let data;

	$: {
		if (data.metadata['iiif-manifest'] && viewer) {
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
							{#if d[`${key}_uri`]}
								<a
									title="nähere Informationen"
									class="anchor"
									href={d[`${key}_uri`]}
									target="_blank"
									rel="noopener"
								>
									<i class="fa-solid fa-circle-info"></i>
									<span class="sr-only"> nähere Informationen </span>
								</a>
							{/if}
						</dt>
						<dd class="pl-2 pt-4">
							{@html Array.isArray(d[key]) ? d[key].join('<br/>') : d[key]}
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
<ContentContainer dark>
	<h2 class="h2">Verwandte Katalogisate</h2>
	<OneRow items={data.related} />
</ContentContainer>
