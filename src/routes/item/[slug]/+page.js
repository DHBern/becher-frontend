import itemData from '../../items/compact.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		id: params.slug
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return itemData.map((item) => ({ slug: item.signature }));
}
