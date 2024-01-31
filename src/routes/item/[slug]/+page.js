import { error } from '@sveltejs/kit';
import itemData from '../../compact.json';
import structure from './structure.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const files = import.meta.glob('./items/*.json');
	let filePromise = null;
	try {
		filePromise = files[`./items/${params.slug}.json`]();
	} catch (e) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		key: params.slug,
		metadata: filePromise,
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
