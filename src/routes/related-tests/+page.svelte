<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import itemData from '$lib/becher_full_json.json';

	/** @type {import('./$types').PageData} */
	export let data;

	let search = '';

	async function doSearch(event) {
		event.preventDefault();
		const found = structuredClone(data.csv.find((row) => row.id.slice(1, -1) === search));
		delete found.id;
		results = found;
		selected = itemData.find((item) => item.key === search);
	}
	let selected = {};
	let results = {};
</script>

<ContentContainer>
	<h1 class="h1">Testseite Dokumentähnlichkeit (inhaltsbasiert)</h1>
	<p>Diese Seite dient zum Vergleich unterschiedlicher Methoden zur Ähnlichkeitsermittlung.</p>
	<p>
		Durch Eingabe einer ID/Signatur werden für 12 Vergleichsmethoden jeweils die fünf ähnlichsten
		Items angezeigt.
	</p>
	<p>Zu beachten:</p>
	<ul class="list-disc">
		<li>
			<p>
				Zur Zeit liegen nur für DEA-Katalogisate Volltextdaten vor (OCR). Weil die Qualität in
				vielen Fällen sehr dürftig ist, wurden mit Methoden zur Verarbeitung natürlicher Sprache
				(NLP) sog. "Named Entities" extrahiert. Die Ähnlichkeitsermittlung verwendet diese
				Textbestandteile (häufig handelt es sich um Personen- oder Ortsangaben).
			</p>
		</li>
		<li>
			<p>
				Weil vorerst keine guten Volltextdaten vorliegen, wurden zur Ähnlichkeitsermittlung keine
				Transformer-Modelle eingesetzt. Sie stellen aber eine vielversprechende Option für eine
				spätere Umsetzung dar.
			</p>
		</li>
		<li>
			<p>
				Denkbar wäre auch die additive Verwendung der hier getesten Ansätze, d.h. pro Dokument
				würden alle Treffer zusammengefasst und nach Häufigkeit sortiert. Items, die durch mehrere
				Methoden als ähnlich ermittelt werden, erhielten entsprechend mehr Gewicht.
			</p>
		</li>
	</ul>
</ContentContainer>

<ContentContainer class="max-w-lg">
	<form on:submit={doSearch}>
		<label for="search" class="label">Suche:</label>
		<div class="flex gap-4">
			<input type="text" id="search" name="search" class="input" bind:value={search} />
			<button class="btn variant-filled-primary" type="submit">Suchen</button>
		</div>
	</form>
</ContentContainer>

{#if selected?.key}
	<ContentContainer dark>
		<h2 class="h2">Ausgewähltes Objekt</h2>
		<OneRow items={[selected]} />
	</ContentContainer>
{/if}
{#each Object.entries(results) as [key, value]}
	{@const items = value
		.replaceAll('"', '')
		.split(',')
		.map((id) => itemData.find((item) => item.key === id))}
	<ContentContainer>
		<h2 class="h2">{key}</h2>
		<OneRow {items} />
	</ContentContainer>
{/each}
