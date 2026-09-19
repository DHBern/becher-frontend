# Becher Digital (BeD)

*Becher Digital* (BeD) is a webapp (mainly) developed in 2024 at the Data Science Lab/Digital Humanities of the University of Bern. It is intened to virtually unite two dispersed archival holdings in a way that facilitates exploration and research.

Contributors: 

* **German Exile Archive 1933–1945**, Frankfurt: Jörn Hasenclever and Sylvia Asmus
* **Swiss Literary Archives**, Bern: Moritz Wagner and Rudolf Probst
* **Data Science Lab**, University of Bern: Peter Dängeli and Sebastian Flick, with support from Sukanya Nath (Data Science Lab, University of Bern) on specific NLP/ML aspects 

The collaboration in a nutshell: Taking the scattered archival holdings of Ulrich Becher at the two institutions as a starting point, the collaboration set out to explore ways of virtually combining the holdings and making them available in ways that facilitate analysis and research across the entire literary estate. The resulting prototype primarily incorporates documents from the two archival collections related to the novels *Murmeljagd* and *Abseits vom Rodeo*, as well as family correspondence. While many gaps remain for the time being, the prototype serves to test various aspects of the envisaged virtual integration and to provide a model starting point for nuanced and efficient research into the life and work of Dana and Ulrich Becher. From a technical point of view, the prototype was devised as a statically-served resource that is not dependent on any running server-side application. All application logic unfolds client-side and the maintenance footprint is kept minimal.

The development of the prototype involved work at the level of **data** (e.g. aligning the RNAB-based archival structures), at a **conceptual level**, and finally at the level of **software development**, re-using existing components wherever possible. These areas had to be balanced against limited resources while also accommodating existing constraints that could not be resolved within the scope of the collaboration. For instance, the lack of sufficiently high-quality OCR data precluded a more in-depth testing of approaches of Natural Language Processing (NLP) and Machine Learning (ML). Instead, the development concentrated on providing varied access to the virtually integrated holdings for users and scholars: archival, semantic, exploratory, map-based, chronological, narrative, and collaborative. These modes of access are described in more detail at [https://dhbern.github.io/becher-frontend/#context](https://dhbern.github.io/becher-frontend/#context).

The code in this repository is released under **ISC license**. Contents and images available in the app are not covered under the same license and **copyright/legal requirements by the archives apply**.

<details><summary>svelte</summary>

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

</details>