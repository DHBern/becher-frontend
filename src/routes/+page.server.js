import categories from './becher_categories_json.json';
import items from './compact.json';

/**
 * @typedef {Object.<import('@skeletonlabs/skeleton').TreeViewNode, {id: number}>} TreeNodeInteger
 */

/**
 * creates a node from a category recursively
 * @param {{id: number, title: string, subcats?: number[]}} category
 * @returns {import('@skeletonlabs/skeleton').TreeViewNode}
 */
const createNode = (category) => {
	const subcats = [...new Set(category?.subcats?.filter((subcat) => subcat !== category.id))];
	return {
		content: category?.title,
		id: category.id.toString(),
		children: subcats?.length
			? subcats.map((id) =>
					createNode(
						// @ts-ignore
						categories.find((cat) => cat.id === id)
					)
				)
			: []
	};
};
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	/** @type {import('@skeletonlabs/skeleton').TreeViewNode[]} */
	const filteredCategories = [];
	const seenIds = new Set();

	for (const category of categories) {
		if (!seenIds.has(category.id)) {
			if (category.subcats) {
				category.subcats = [
					...new Set(category.subcats.filter((subcat) => subcat !== category.id))
				];
				if (category.subcats.length === 0) {
					// @ts-ignore
					delete category.subcats;
				} else {
					category.subcats.forEach((subcat) => {
						seenIds.add(subcat);
					});
				}
			}
			filteredCategories.push(createNode(category));
			seenIds.add(category.id);
		}
	}

	return {
		categories: filteredCategories,
		items: items.map((item) => {
			// eslint-disable-next-line no-unused-vars
			const { entry_type, ...rest } = item;
			return rest;
		})
	};
}
