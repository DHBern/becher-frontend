<script>
	let className = '';

	export { className as class };
	export let dark = false;
</script>

<section class="w-full px-8 my-8 {dark ? 'bg-primary-500 text-secondary-500' : ''}">
	<div class="container mx-auto {className}">
		<slot />
	</div>
</section>
