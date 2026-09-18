<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import ContentContainer from '$lib/components/ContentContainer.svelte';
	import { guidance } from '$lib/stores.js';
	import { goto } from '$app/navigation';
	import { base, resolveRoute } from '$app/paths';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	let introExpanded = false;

	/** @param {number} tab */
	function goHomeTab(tab) {
		guidance.set({ type: 'tab', tab });
		if ($page.url.pathname !== base + '/') goto(base + '/');
	}

	function goBestand() {
		// Only acts on the home page where the "Virtueller Bestand" section exists.
		if ($page.url.pathname === base + '/') guidance.set({ type: 'bestand' });
	}

	/** @param {KeyboardEvent} e @param {() => void} fn */
	function onKey(e, fn) {
		if (e.key === 'Enter' || e.key === ' ') fn();
	}
</script>

<ContentContainer>
	<h2 class="h2">Context and Guidance</h2>
	<div class="container relative">
		{#if !introExpanded}
			<div class="intro-fade pointer-events-none" aria-hidden="true"></div>
		{/if}
		<p>
			The prototype application “Becher Digital” (BeD) was developed in 2024 by Jörn Hasenclever and
			Sylvia Asmus (German Exile Archive 1933–1945, Frankfurt), Moritz Wagner and Ruedi Probst
			(Swiss Literary Archives, Bern), as well as Peter Dängeli and Sebastian Flick (Data Science
			Lab, University of Bern), with support from Sukanya Nath (Data Science Lab, University of
			Bern) on specific NLP/ML aspects. Taking the scattered archival holdings of Ulrich Becher at
			the two institutions as a starting point, the collaboration set out to explore ways of
			virtually combining the holdings and making them available in ways that facilitate analysis
			and research across the entire literary estate. The resulting prototype primarily incorporates
			documents from the two archival collections related to the novels Murmeljagd and Abseits vom
			Rodeo, as well as family correspondence. While many gaps remain for the time being, the
			prototype serves to test various aspects of the envisaged virtual integration and to provide a
			model starting point for nuanced and efficient research into the life and work of Dana and
			Ulrich Becher. From a technical point of view, the prototype was devised as a
			statically-served resource that is not dependent on any running server-side application. All
			application logic unfolds client-side and the maintenance footprint is kept minimal.
		</p>
		{#if introExpanded}
			<div transition:slide|local>
				<p>
					The development of the prototype involved work at the level of data (e.g. aligning the
					RNAB-based archival structures), at a conceptual level, and finally at the level of
					software development, re-using existing components wherever possible. These areas had to
					be balanced against limited resources while also accommodating existing constraints that
					could not be resolved within the scope of the collaboration. For instance, the lack of
					sufficiently high-quality OCR data precluded a more in-depth testing of approaches of
					Natural Language Processing (NLP) and Machine Learning (ML). Instead, the development
					concentrated on providing varied access to the virtually integrated holdings for users and
					scholars: archival, semantic, exploratory, map-based, chronological, narrative, and
					collaborative. These modes of access are described in more detail below.
				</p>
				<p>
					The approaches tested revealed considerable potential for research, and this impression
					was clearly reinforced by feedback from literary scholars and researchers in exile studies
					who were given the opportunity to test the prototype. Consequently, the participating
					institutions and individuals developed a research plan for the more comprehensive
					implementation of a research and archival portal and are seeking to secure the necessary
					funding.
				</p>
			</div>
		{/if}
		<button
			type="button"
			class="btn variant-ghost-surface btn-sm mt-2 gap-2"
			aria-expanded={introExpanded}
			on:click={() => (introExpanded = !introExpanded)}
		>
			<span>{introExpanded ? 'Show less' : 'Read more'}</span>
			<span class="transition-transform duration-200" class:rotate-180={introExpanded}>▾</span>
		</button>
	</div>
	<h2 class="h2">Features</h2>
	<Accordion regionControl="variant-ringed-tertiary">
		<AccordionItem on:click={goBestand} on:keydown={(e) => onKey(e, goBestand)}>
			<svelte:fragment slot="summary">Archival access</svelte:fragment>
			<svelte:fragment slot="content"
				><p>
					The portal of the DEA prioritises search over hierarchy for users, whereas the catalog
					view of the SLA puts hierarchy first (compare
					<a
						class="anchor"
						href="https://portal.dnb.de/opac/simpleSearch?cqlMode=true\&query=partOfTreasury%3D981903096https://portal.dnb.de/opac/simpleSearch?cqlMode=true\&query=partOfTreasury%3D981903096"
						target="_blank">DEA</a
					>
					and
					<a class="anchor" href="https://ead.nb.admin.ch/html/ubecher\_B.html" target="_blank"
						>SLA</a
					> searches). In the prototype implementation, both access modes are purposefully integrated
					allowing for the overall collection to be narrowed down at once by hierarchical selection and
					through the searching and filtering of metadata. This enables, for instance, reducing the result
					set by the main units of the RNAB schema and their subdivisions ("Works," "Correspondences,"
					"Life Documents") in combination with metadata filters such as correspondents, places of origin,
					languages, or work authority data. A combined approach is also possible, allowing for example,
					to search for letters in French within the category "Letters to Ulrich Becher". The eight found
					results may then furthermore be split by institution.
				</p>

				<p>
					Both archives structure and describe their holdings using the *Ressourcenerschließung mit
					Normdaten in Archiven und Bibliotheken* standard (RNAB). Working on the data layer of the
					prototype revealed however certain differences in the actual implementations. To align the
					resulting differing structures found in the two archives, a virtual tree structure was
					created, based on a customary mapping. Depending on the required level of granularity,
					this structure assigns individual items or series of items to overarching shared
					categories. The hierarchical filter functionality of the prototype is based on this
					alignment.
				</p>

				<p>
					Another data refinement concerns the assignment of GND work authority data to archival
					units (GND Entity code Q249 wit). In the course of the prototype this was carried out for
					materials associated with the works *Abseits vom Rodeo* and *Murmeljagd* as a proof of
					concept that has shown to be highly valuable and will be applied to other works and result
					in a considerable coverage of the materials. Work authority data allows to isolate
					documents related to a given work from both archives, not limited to literary texts but
					also comprising other types of texts such as letters, and to offer researchers an
					interesting point of access to relevant and pertinent parts of the overall collection.
				</p>

				<p>
					It should be noted that creating this kind of authority links requires a high degree of
					familiarity with an author’s work (and life) and often requires research in its own right.
					Raising (and answering) questions of delineation that go along with this adds value for
					the archival, library, and research communities.
				</p></svelte:fragment
			>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">Semantic access (document similarity)</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					Retrieving documents based on semantic similarity based on their full-text content has
					obvious potential. Embedding the archival documents in a vector space allows to retrieve
					semantically meaningful information about them and their relationship. While earlier
					word-level embedding models such as Word2Vec and GLoVe, which offer computational
					efficiency, allow to create a good baseline, they lack contextual differentiation, making
					them less effective in handling synonyms and polysemous words. Transformer-based models,
					such as those benchmarked on the Massive Text Embedding Benchmark (MTEB) help to get a
					stronger semantic grasp. By incorporating metadata and document layout information
					alongside textual content and creating a multi-modal embedding model, embeddings may be
					further enriched and allow to also capture the semantic structure and contextual
					relationships inherent in archival materials.
				</p>

				<p>
					Due to the limited availability of high-quality full-text data, the prototype
					implementation could only scratch the surface in this regard. Using a subset of
					machine-written family letters we carried out experiments using basic methods of
					similarity determination such as word embedding/Bag-of-Words, N-grams, as well as the
					TF-IDF measure, applying common distance metrics such as Cosine similarity, Euclidean
					distance, and the Jaccard coefficient (cf. <a
						class="anchor"
						href={resolveRoute('/related-tests', {})}>related tests</a
					>). Processing these materials using more advanced machine learning methods such as the
					application of language models and transformer approaches, revealed promising potential in
					this regard. With growing coverage of full-text data, these approaches, as well as more
					recent ones than the ones available in 2024, could be applied more comprehensively.
				</p>

				<p>
					Independent of particular methods, a continuous assessment of performance gains across
					different embedding models and fine-tuning iterations is crucial to assure quality and
					efficiency. This kind of checking may open up interesting avenues for further research.
					For instance, the work authority data assigned by human experts might serve as a good
					benchmark to evaluate document sets relating to a particular literary work as computed by
					machines and an evaluation to what extent work-adherence of archival materials may be
					approximated computationally might lead to interesting contributions in the field of data
					science.
				</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem on:click={() => goHomeTab(3)} on:keydown={(e) => onKey(e, () => goHomeTab(3))}>
			<svelte:fragment slot="summary">Exploratory access (visual similarity)</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					Archival sources are typically not heterogeneous in terms of formats, materiality, and
					means of inscription. They possess more or less distinct visual features that allow
					clustering using methods of computer vision. By extracting feature vectors from images
					during their processing, images may be represented in a vector space, or, following
					algorithmical reduction of the dimensionality (e.g. t-distributed stochastic neighbor
					embedding/t-SNE or uniform manifold approximation and projection/UMAP), in a coordinate
					system.
				</p>

				<p>
					Under the similarity tab (“Ähnlichkeit”), the prototype displays all facsimile images
					clustered by visual features such as colors, shapes, and inscriptions. This functionality
					is implemented using the VIKUS viewer, a generalisation of the results from a three-year
					BMBF research project at the UCLAB at FH Potsdam. The resulting interactive visualisation
					provides a comprehensive overview of the material character of the collection and serves
					as an exploratory access point for user groups who are not very familiar with the
					collections and their cataloguing. A filter allows for a clear comparison of the archival
					affiliation of the images. Further refinements can be made using filters for structural
					affiliation, language, or work authority data. From the overall view, users can seamlessly
					zoom in on individual images, for which metadata and links to the item view are available.
					Thus, the visualisation is not merely an end in itself or a decorative element, but rather
					an effective gateway into the archival collection.
				</p>

				<p>
					In some way, this ready-made visualisation serves as a place holder for a more customised
					tool that facilitates visual exploration and comparison, but also ties in directly with
					other filters and modes of access. Using multi-modal embeddings should eventually allow
					combining visual filtering with e.g. hierarchical selection or metadata filters.
				</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem on:click={() => goHomeTab(1)} on:keydown={(e) => onKey(e, () => goHomeTab(1))}>
			<svelte:fragment slot="summary">Map-based access</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					As an additional way to explore and access the documents, the prototype makes use of an
					interactive geo-visualisation. This component represents items that are linked with
					geographical authority data on a map using geocoordinates derived from the GND (cf. <a
						class="anchor"
						href="https://www.dnb.de/DE/Professionell/Metadatendienste/Datenbezug/LDS/lds_node.html#:~:text=GeoNames"
						target="_blank">GND Geonames</a
					>). It offers common interactive features, including clustering depending on the zoom
					level, filtering by document type and creation date, as well as linking map markers to
					object views. The places of origin recorded in the metadata can be utilised directly in
					this way, but given that only a fraction of the archival documents are provided with
					geographical metadata, the currently implemented map component possesses limited value and
					validity. This also applies to the weights of the represented documents that is the same
					for every instance: a one-sided postcard does not differ from a literary text consisting
					of hundreds of pages (apart from the visual form of the map marker).
				</p>
				<p>
					Whereas the map component of the prototype is kept simple, with places represented as
					distinct, isolated units, a number of improvements are conceivable. On the basis of
					dispatch locations and recipient or address locations of letters, correspondence routes
					could be illustrated and presented as (directionally) connected. The map could also show
					Becher’s escape routes based on biographical, contextually ascertained knowledge. This
					would necessitate to aggregate multiple data points into definable stages, taking into
					account and allowing for temporal and spatial uncertainties. Taken together, this would
					have the potential to provide insights into the working processes during exile and point
					to biographical turning points and ruptures.
				</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem on:click={() => goHomeTab(2)} on:keydown={(e) => onKey(e, () => goHomeTab(2))}>
			<svelte:fragment slot="summary">Chronological access</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					To give an impression of text production and correspondence activity over time, the
					prototype makes use of a timeline that relates all datable documents to a year. As is the
					case for the similarity visualisation, the timeline display is based on the VIKUS viewer
					and accessible over a tab (“Chronologie”). or each year within the range of 1916 to 1990
					the documents are presented as thumbnails. Initially, all images appear above an imaginary
					dividing line, neatly stacked in blocks. Through interaction, such as selecting filter
					criteria – e.g, archive, language, or context of the work – the filtered items slide below
					the line. The visual implementation, resembling a bar chart, shows differing frequencies.
					Brief characterisations of the events occurring in a given year are attached to the
					dividing line, giving key information about biographies and works at three zoom levels.
					The preview images can also be enlarged, with their content becoming clearer with each
					zoom level. Just before the preview transitions to a full canvas view, the image is
					supplemented by a side-panel that provides basic metadata and links to the relevant item
					view. In this way, a navigation path is created from the timeline visualisation to each
					individual catalogue entry.
				</p>

				<p>
					Currently, all images are plotted on the timeline as independent units. An obvious
					improvement to this kind of display would be an option to collapse all pages that belong
					to a text into a single representation, possibly indicating the volume by size. In the
					prototype, it is possible to list documents related to a year or a range of years using
					the “Datumsbereich” option below the search input field.
				</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<h2 class="h2">Planned Features</h2>
	<p>
		A number of core discovery functions such as archival, visual, spatial, and temporal navigation
		of the joint holdings could be explored within the resource and technical constraints of the
		prototype. This was however not the case for two features that require server-side interaction
		and thus would require a different kind of architecture (possibly implemented as a hybrid setup
		with a static page combined with dynamic modules).
	</p>
	<Accordion regionControl="variant-ringed-tertiary">
		<AccordionItem>
			<svelte:fragment slot="summary">Collaborative access (citizen science)</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					A resource such as the planned Becher Digital platform has the potential to involve its
					users for enriching its contents. By transcribing and annotating manuscripts, photos, and
					graphics, for which OCR/HTR output is deficient (analogous to the e-manuscripta workflow),
					users could contribute to a living digital resource. This would be particularly exciting
					for more complex sketches and drawings or documents that shed light on the textual genesis
					and the creative production processes of Ulrich and Dana Becher, but it would also be
					rewarding to identify individuals, to decipher hard-to-read passages or to supply missing
					metadata. This kind of collaborative enrichment and annotation workflow, overseen by an
					editorial team maintained by the two archives, could serve as a communicative means for
					scientific exchange and strengthen the relations between the archives, researchers, and a
					wider audience.
				</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">Conversational access</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					Over the last few years, users gradually became familiar with novel ways to query
					knowledge from online sources. Chatbots and conversational interfaces, building upon LLMs
					and probabilistic output generation have become commonplace and are also being used in the
					context of research and archives. This kind of approach could enhance a platform such as
					Becher Digital, too, as long as it complies with legal limitations, ensures source
					grounding and provenance transparency, and is not an excessive strain on natural and
					economical resources.
				</p>

				<p>
					A possible way to implement this is a conversational interface grounded in
					retrieval-augmented generation (RAG) over a multi-modal input dataset consisting of
					cataloguing metadata, full text obtained through text recognition (OCR/HTR) or
					transcription, and visual carriers (digitised documents, photographs, drawings), but
					including only materials that are not impeded by copyright and personal rights. Users
					could then interact with the resource in a dialogic way and would get outputs that are
					coupled with transparent source references and clear indications of uncertainty,
					facilitating targeted discovery across the heterogeneous archival materials.
				</p>

				<p>
					This built-in dialogue-based interface could also be complemented by a machine/agent
					readable interface using the model context protocol (MCP) or a similar mechanism that
					allows external applications to tap into the platform’s knowledge. Just as with a built-in
					interface, this approach would need to ensure that no impermissive data leaks to third
					parties.
				</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</ContentContainer>

<style>
	.intro-fade {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 3rem;
		height: 6rem;
		background: linear-gradient(
			to bottom,
			rgb(var(--color-surface-50) / 0),
			rgb(var(--color-surface-50) / 1)
		);
	}

	:global(.dark) .intro-fade {
		background: linear-gradient(
			to bottom,
			rgb(var(--color-surface-900) / 0),
			rgb(var(--color-surface-900) / 1)
		);
	}
</style>
