<script>
	/**
	 * @type {string[]}
	 */
    export let array;


	// This function is for generating the HTML to be used for organising the checkboxes (in this case, it's organised in 4 columns)
    /**
	 * @param {string[]} array
	 */
	 function generateCheckboxDivs(array) {
		const divs = array.map((text) => {

			return `
				<div>
					<label class='flex items-center '>
						<input class='checkbox m-5' type='checkbox'/>
						<p>${text}</p>
					</label>
				</div>
			`;
		});

		return `<div class='flex text-sm grid grid-cols-4'>${divs.join('')}</div>`;
	}

	/**
	 * @type {string}
	 */
	const resultHtml = generateCheckboxDivs(array);
</script>

{@html resultHtml}
