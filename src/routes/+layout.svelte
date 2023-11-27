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
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Logo</strong>
			</svelte:fragment>
			<nav class="flex-none flex items-center space-x-4">
				<a href="/" class="list-nav-item {classesActive('/')}  rounded-full p-2">Home</a>
				<a href="/about" class="list-nav-item {classesActive('/about')} rounded-full p-2">About</a>
			</nav>
			<svelte:fragment slot="trail">
				<button>
					<i class="fa-solid fa-bars"></i>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
