<script>
	import { page } from '$app/stores';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		getDrawerStore,
		Drawer,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/solid.min.css';
	import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
	import { base } from '$app/paths';

	initializeStores();
	const drawerStore = getDrawerStore();

	$: isDrawerOpen = $drawerStore.open ? true : false;
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
</script>

<Drawer height='h-auto'>
	<nav class="list-nav">
		<!-- (optionally you can provide a label here) -->
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

<!-- App Shell -->
<AppShell slotFooter="bg-secondary-500 p-4" slotPageContent="space-y-8" class="{isDrawerOpen ? 'pointer-events-none' : ''}">
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
	<svelte:fragment slot="footer">Page Footer</svelte:fragment>
</AppShell>
