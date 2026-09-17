import { writable } from 'svelte/store';

export const miniSearch = writable();

/**
 * Deep-link action requested from the Context & Guidance drawer.
 * @type {import('svelte/store').Writable<{type: 'bestand'} | {type: 'tab', tab: number} | null>}
 */
export const guidance = writable(null);
