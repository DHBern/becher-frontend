import itemData from '$lib/becher_full_json.json';
import structure from '$lib/structure.json';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const filePromise = import(`../../../lib/items/${params.slug}.json`);

	return {
		key: params.slug,
		metadata: (await filePromise).default,
		structure,
		related: itemData
			.filter((i) => /*i.prototype && */ i.key.startsWith(params.slug.slice(0, -2)))
			.map((item) => {
				// eslint-disable-next-line no-unused-vars
				const { entry_type, prototype, ...rest } = item;
				return rest;
			})
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return itemData.filter((i) => i.prototype).map((item) => ({ slug: item.key }));
}
