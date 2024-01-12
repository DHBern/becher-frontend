import { error } from '@sveltejs/kit';
import itemData from '../../compact.json';

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
		metadata: filePromise
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return itemData.map((item) => ({ slug: item.key }));
}
