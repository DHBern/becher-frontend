<script>
	let className = '';

	export { className as class };
	export let dark = false;
</script>

<div class="w-full p-8 {dark ? 'bg-primary-500 text-secondary-500' : ''} {className}">
	<slot />
</div>
