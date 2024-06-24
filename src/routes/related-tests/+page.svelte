<script>
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import OneRow from '$lib/components/OneRow.svelte';
	import itemData from '$lib/becher_full_json.json';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let selected = {};
	let results = {};
	let search = '';

	onMount(() => {
		search = $page.url.searchParams.get('s');
		if (search) doSearch({ preventDefault: () => {} });
	});

	async function doSearch(event) {
		event.preventDefault();
		const found = structuredClone(data.csv.find((row) => row.id.slice(1, -1) === search));
		if (found?.id) delete found.id;
		results = found;
		selected = itemData.find((item) => item.key === search);
		if (search !== data.search) {
			goto(`${base}/related-tests?s=${search}`);
		}
	}
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

<ContentContainer dark>
	<h2 class="h2">Glossar</h2>
	<div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(36rem,1fr))]">
		<div>
			<p class="mt-4 mb-1"><strong>Bag of Words</strong></p>
			<p>
				“Bag-of-Words” bezeichnet die Auflistung aller in einem Dokument vorkommenden Wörter nach
				Häufigkeit, d.h. es wird jedes distinkte Wort aufgeführt mit der Angabe wie oft es vorkommt
				(nach Eliminierung von Satzzeichen, Stopwörtern usw.). Dokumente mit hoher Überlappung der
				häufigsten Begriffe gelten als ähnlich (ohne Berücksichtigung bestimmter Wortkombinationen).
			</p>
			<p>
				Basierend auf den Worthäufigkeit lassen sich Dokumente als (vieldimensionale) Vektoren
				auffassen, woran verschiedene Ähnlichkeitsberechnungen anschließen können.
			</p>
			<p>
				Der BOW-Ansatz ist nützlich zum Vergleich sehr kurzer Dokumente. Bei längeren Dokumenten
				dient er als Vergleichsbasis gegenüber spezifischeren Methoden zur Ähnlichkeitsermittlung.
			</p>

			<p class="mt-4 mb-1"><strong>Ngram</strong></p>
			<p>
				Natürliche Sprache verwendet Zeichen und Wörter nicht (nur) isoliert, sondern häufig in
				typischen Kombinationen. N-Gramm-Ansätze vergleichen solche Zeichen- und Wortsequenzen (z.B.
				Bigramm, Trigramm) und berücksichtigen damit Kontextinformation (wenngleich in limitiertem
				Ausmaß).
			</p>

			<p class="mt-4 mb-1"><strong>TF-IDF (term frequency-inverse document frequency)</strong></p>
			<p>
				Produkt aus absoluter Häufigkeit eines Begriffs und seinem relativen Vorkommen in der
				Gesamtheit der Dokumente. Insgesamt seltener vorkommende Begriffe erhalten dadurch höhere
				Gewichtung.
			</p>
		</div>
		<div>
			<p class="mt-4 mb-1"><strong>Ähnlichkeitsmetrik:</strong></p>

			<p class="mt-4 mb-1"><strong>Cosinus-Ähnlichkeit</strong></p>
			<p>
				Die Cosinus-Ähnlichkeit vergleicht die Winkel zwischen Vektoren. Sie ist ein Maß dafür, wie
				ausgeprägt zwei Vektoren in die gleiche Richtung zeigen.
			</p>

			<p class="mt-4 mb-1"><strong>Euklidischer Abstand</strong></p>
			<p>
				Der Euklidische Abstanz misst die geradlinige Distanz zwischen zwei Punkten in einem
				mehrdimensionalen Raum. Liegen zwei Dokumente (bzw. deren Vektorrepräsentation) nahe bei
				einander, gelten sie als ähnlich.
			</p>

			<p class="mt-4 mb-1"><strong>Jaccard-Index</strong></p>
			<p>
				Die Häufigkeit der Begriffe wird in Proportion gesetzt zur Gesamtheit distinkter Begriffe in
				den verglichenen Dokumenten.
			</p>
		</div>
	</div>
</ContentContainer>

<ContentContainer class="max-w-lg">
	<form on:submit={doSearch}>
		<label for="search" class="label"><h2 class="h2">Suche:</h2></label>
		<div class="flex gap-4">
			<input type="text" id="search" name="search" class="input" bind:value={search} />
			<button class="btn variant-filled-primary" type="submit">Suchen</button>
		</div>
	</form>
</ContentContainer>

{#if selected?.key}
	<ContentContainer dark>
		<h2 class="h2">Ausgewähltes Dokument</h2>
		<OneRow items={[selected]} />
	</ContentContainer>
{/if}
<ContentContainer>
	{#if results && Object.keys(results).length}
		<h2 class="h2">Ähnliche Dokumente</h2>
		{#each Object.entries(results) as [key, value]}
			{@const items = value
				.replaceAll('"', '')
				.split(',')
				.map((id) => itemData.find((item) => item.key === id))}
			<h3 class="h3">{key}</h3>
			{#if items.some((i) => !i)}
				<p>Einige Items konnten nicht gefunden werden. Roher Output:</p>
				{value}
			{/if}
			<OneRow {items} />
		{/each}
	{:else}
		<p>keine Ergebnisse</p>
	{/if}
</ContentContainer>
