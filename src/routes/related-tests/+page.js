import data from '$lib/similarity_ranked_no_contents_just_ids.csv';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	return { csv: data, search: url.searchParams.get('s') };
}
