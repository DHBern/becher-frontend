<script>
	import { page } from '$app/stores';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		getDrawerStore,
		Drawer,
		initializeStores,
		Toast,
		getToastStore,
		localStorageStore
	} from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/solid.min.css';
	import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import FooterImg1 from '../lib/assets/logo_ch.png?enhanced';
	import FooterImg2 from '../lib/assets/logo_DEA.png?enhanced';

	initializeStores();
	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();

	const showWarning = localStorageStore('warning', true);

	$: classesActive = (/** @type {string} */ href) =>
		href === $page.url.pathname
			? 'bg-primary-500 hover:text-primary-400 text-secondary-500'
			: 'hover:text-primary-500';

	function drawerOpen() {
		const /** @type {import('@skeletonlabs/skeleton').DrawerSettings} */ s = {
				id: 'topnav',
				position: 'top'
			};
		drawerStore.open(s);
	}

	const pages = [
		{ slug: 'Home', path: '/' },
		{ slug: 'Über das Projekt', path: '/about' },
		{ slug: 'Biographie', path: '/bio' }
	];

	/** @type {import('@skeletonlabs/skeleton').ToastSettings} */
	const t = {
		message: `Die vorliegende Anwendung hat prototypischen Charakter und
			 stellt kein dauerhaftes Angebot dar. Die Reproduktion der
			 dargebotenen Materialien ist ohne ausdrückliche Zusage der bestandeshaltenden Institutionen untersagt.`,
		action: {
			label: `<i class="fa-solid fa-trash"></i>`,
			response: () => {
				$showWarning = false;
				toastStore.clear();
			}
		},
		autohide: false,
		background: 'variant-filled-warning'
	};
	onMount(() => {
		if ($showWarning) {
			toastStore.trigger(t);
		}
	});
</script>

<Drawer height="h-auto">
	<nav class="list-nav">
		<ul>
			{#each pages as page}
				<li>
					<a href={`${base}${page.path}`}>
						<span class="flex-auto">{page.slug}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</Drawer>
<Toast
	buttonAction="btn btn-icon-sm variant-ghost"
	buttonDismiss="btn-icon btn-icon-md variant-ghost"
/>
<!-- App Shell -->
<AppShell slotPageFooter="bg-secondary-500 p-4" slotPageContent="space-y-8">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="px-4" slotDefault="h-full" background="bg-surface-100-900-token">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase py-4">Logo</strong>
			</svelte:fragment>
			<nav class="flex-none items-center h-full hidden md:flex">
				{#each pages as page}
					<a
						href={`${base}${page.path}`}
						class="list-nav-item h-full p-4 {classesActive(page.path)}">{page.slug}</a
					>
				{/each}
			</nav>
			<svelte:fragment slot="trail">
				<button class="md:!hidden btn-icon" on:click={drawerOpen}>
					<i class="fa-solid fa-bars"></i>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="grid grid-cols-2 md:!grid-cols-5 gap-1 lg:ml-10 lg:mr-10">
			<enhanced:img src={FooterImg1} alt="Ulrich Becher in Basel" />

			<enhanced:img src={FooterImg2} alt="Ulrich Becher in Basel" />

			<p class="h5 md:h6 lg:h5 text-black col-span-2 justify-self-start">
				Ein Prototyp des Deutschen Exilarchivs (DEA) und des Schweizerischen Literarurarchivs (SLA)
			</p>

			<p class="h5 text-black col-span-2 md:col-span-1 justify-self-start md:justify-self-end">
				Impressum
			</p>
		</div>
	</svelte:fragment>
</AppShell>
