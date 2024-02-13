import itemData from '../../becher_full_json.json';
import structure from '../../structure.json';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return {
		key: params.slug,
		metadata: itemData.find((i) => i.key === params.slug),
		structure,
		related: itemData
			.filter((i) => i.prototype && i.key.startsWith(params.slug.slice(0, -2)))
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
