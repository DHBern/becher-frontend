import { getContext, setContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol.for('svelte-maplibre');

export function mapContext() {
	return getContext(MAP_CONTEXT_KEY);
}
