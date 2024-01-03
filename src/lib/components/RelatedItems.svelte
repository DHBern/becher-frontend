<script>
	/**
	 * @type {string[]}
	 */
	export let array;
</script>

<h3 class="h3 m-3">Suchen in</h3>
<div class="text-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ml-6 sm:ml-0">
	{#each array as text}
		<div>
			<label class="flex items-center">
				<input class="checkbox m-2 lg:m-5" type="checkbox" />
				<p>{text}</p>
			</label>
		</div>
	{/each}
</div>
