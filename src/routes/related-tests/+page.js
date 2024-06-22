import data from '$lib/similarity_ranked_no_contents_just_ids.csv';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return { csv: data };
}
