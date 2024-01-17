<script>
	let className = '';

	export { className as class };
	export let dark = false;
</script>

<section class="w-full p-8 {dark ? 'bg-primary-500 text-secondary-500' : ''}">
	<div class="container mx-auto {className}">
		<slot />
	</div>
</section>
