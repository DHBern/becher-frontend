<script>
	import { page } from '$app/stores';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/solid.min.css';
	import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

	$: classesActive = (/** @type {string} */ href) =>
		href === $page.url.pathname
			? '!bg-primary-500 hover:text-primary-400'
			: 'hover:text-primary-500';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="px-4" slotDefault="h-full">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase py-4">Logo</strong>
			</svelte:fragment>
			<nav class="flex-none flex items-center h-full">
				<a href="/" class="list-nav-item h-full {classesActive('/')} p-4">Home</a>
				<a href="/about" class="list-nav-item h-full {classesActive('/about')} p-4">About</a>
			</nav>
			<svelte:fragment slot="trail">
				<button class="lg:!hidden btn-icon">
					<i class="fa-solid fa-bars"></i>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
