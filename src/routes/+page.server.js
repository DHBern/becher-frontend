import categories from '$lib/becher_categories_json.json';
import items from '$lib/becher_full_json.json';
import fullstructure from '$lib/structure.json';

/**
 * @typedef {Object.<import('@skeletonlabs/skeleton').TreeViewNode, {id: number}>} TreeNodeInteger
 */

/**
 * creates a node from a category recursively
 * @param {{id: number, title: string, title2: string, subcats?: number[]}} category
 * @param {Set<Number>} targetIds
 * @returns {import('@skeletonlabs/skeleton').TreeViewNode}
 */
const createNode = (category, targetIds) => {
	const subcats = [...new Set(category?.subcats?.filter((subcat) => subcat !== category.id))];
	/**
	 * @type {import("@skeletonlabs/skeleton").TreeViewNode[]}
	 */
	let children = [];

	if (subcats?.length) {
		children = subcats
			.filter((subcat) => subcatsSubcats(subcat).some((id) => targetIds.has(id)))
			.map((id) =>
				createNode(
					// @ts-ignore
					categories.find((cat) => cat.id === id),
					targetIds
				)
			);
	}

	return {
		content:
			category?.title ||
			(category?.title2 ? `no title, title2: ${category.title2}` : `No title2, id: ${category.id}`),
		id: category.id.toString(),
		children
	};
};

const subcatsSubcats = (/** @type {number} */ catId, excludeset = new Set()) => {
	const returnSet = new Set([catId]);
	const cat = categories.find((cat) => cat.id === catId);
	cat?.subcats?.forEach((subcat) => {
		if (!excludeset.has(subcat)) {
			const newExcludeset = new Set([...excludeset, ...cat.subcats]);
			subcatsSubcats(subcat, newExcludeset).forEach((id) => returnSet.add(id));
		}
	});
	return [...returnSet];
};
/**
 * @param {number[]} subcats
 * @param {Set<any>} seenIds
 */
function addSubcatsToSeenIDs(subcats, seenIds) {
	for (const subcat of subcats) {
		if (seenIds.has(subcat)) {
			continue;
		}
		seenIds.add(subcat);
		const category = categories.find((cat) => cat.id === subcat) || { subcats: [] };
		if (category.subcats) {
			seenIds = addSubcatsToSeenIDs(category.subcats, seenIds);
		}
	}
	return seenIds;
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	/** @type {import('@skeletonlabs/skeleton').TreeViewNode[]} */
	const filteredCategories = [];
	let seenIds = new Set();
	categories.sort((a, b) => {
		if (a.subcats && !b.subcats) {
			return -1; // 'a' comes first
		} else if (!a.subcats && b.subcats) {
			return 1; // 'b' comes first
		}
		// If both have 'subcats' or neither have it, keep original order
		return 0;
	});
	/** @type {Omit<import('$lib/itemtype.ts').Item, 'prototype'>[]} */
	const filteredItems = items
		// errormessage is ignored because something about the typesetting of the imported JSON doesn't work
		// @ts-ignore
		// .filter((/** @type {{ prototype: any; }} */ item) => item.prototype) // Filter out items that don't belong in the prototype
		.map((/** @type {import('$lib/itemtype.ts').Item} */ item) => {
			// eslint-disable-next-line no-unused-vars
			let { prototype, iiif, ...rest } = item;
			iiif = iiif.replaceAll('\\', '');
			//loop over rest and check if value is an Object, if so, just take the key "name"
			for (const [key, value] of Object.entries(rest)) {
				if (Array.isArray(value)) {
					// @ts-ignore
					rest[key] = value.map((element) => {
						if (typeof element === 'object') {
							return element.name;
						} else {
							return element;
						}
					});
				}
			}
			return { ...rest, iiif };
		});

	// filter the categories to only include those that have items
	const categoryIds = filteredItems.map((item) => item.category);
	const filteredCategoriesIds = new Set(categoryIds);

	for (const category of categories) {
		// does an intersection exist between the category and the filtered category ids? e.g. does the category have items?
		const intersection = [...filteredCategoriesIds].some((id) =>
			new Set([category.id, ...(category?.subcats || [])]).has(id)
		);
		if (!seenIds.has(category.id) && intersection) {
			if (category.subcats) {
				category.subcats = [
					...new Set(category.subcats.filter((subcat) => subcat !== category.id))
				];
				if (category.subcats.length === 0) {
					// @ts-ignore
					delete category.subcats;
				} else {
					seenIds = addSubcatsToSeenIDs(category.subcats, seenIds);
				}
			}
			filteredCategories.push(createNode(category, filteredCategoriesIds));
			seenIds.add(category.id);
		}
	}

	return {
		categories: filteredCategories,
		itemstructure: fullstructure,
		allFields: fullstructure.find((structure) => structure.type === 'search')?.fields,
		items: filteredItems
	};
}
