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

	initializeStores();
	const drawerStore = getDrawerStore();

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
</script>

<Drawer height="h-16"
	><nav class="list-nav">
		<!-- (optionally you can provide a label here) -->
		<ul>
			<li>
				<a href="/elements/lists">
					<span class="badge bg-primary-500">(icon)</span>
					<span class="flex-auto">Skeleton</span>
				</a>
			</li>
		</ul>
	</nav></Drawer
>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="px-4" slotDefault="h-full">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase py-4">Logo</strong>
			</svelte:fragment>
			<nav class="flex-none flex items-center h-full">
				<a href="/" class="list-nav-item h-full p-4 {classesActive('/')}">Home</a>
				<a href="/about" class="hidden sm:block list-nav-item h-full p-4 {classesActive('/about')}"
					>Über das Projekt</a
				>
				<a href="/bio" class="hidden sm:block list-nav-item h-full p-4 {classesActive('/bio')}"
					>Biographie</a
				>
			</nav>
			<svelte:fragment slot="trail">
				<button class="sm:!hidden btn-icon" on:click={drawerOpen}>
					<i class="fa-solid fa-bars"></i>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
