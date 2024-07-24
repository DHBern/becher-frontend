import itemData from '$lib/becher_full_json.json';
import structure from '$lib/structure.json';
import linkstructure from '$lib/linkstructure.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	// const filePromise = import(`../../../lib/items/${params.slug}.json`);
	const item = itemData.find((item) => item.key === params.slug);

	return {
		key: params.slug,
		metadata: item,
		structure,
		linkstructure,
		related: [
			item?.wit ? itemData.filter((i) => i.wit.some((element) => item.wit.includes(element))) : [],
			itemData
				.filter((i) => /*i.prototype && */ i.category === item.category)
				.map((item) => {
					// eslint-disable-next-line no-unused-vars
					const { entry_type, prototype, ...rest } = item;
					return rest;
				})
		]
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return itemData.filter((i) => i.prototype).map((item) => ({ slug: item.key }));
}
