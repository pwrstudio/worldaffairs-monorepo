<script lang="ts">
    import type { About, Release, Video, Tour, TourDate, Product, Work } from '@sanity-types';

    import Ticker from '$lib/components/Ticker/Ticker.svelte';
    import ClockGroup from '$lib/components/Clock/ClockGroup.svelte';
    import Header from '$lib/components/Header/Header.svelte';
    import Store from '$lib/components/Store/Store.svelte';
    import Newsletter from '$lib/components/NewsLetter/NewsLetter.svelte';
    import Contact from '$lib/components/Contact/Contact.svelte';
    import Footer from '$lib/components/Footer/Footer.svelte';

    import MusicTable from '$lib/components/Tables/MusicTable.svelte';
    import VideoTable from '$lib/components/Tables/VideoTable.svelte';
    import TourDateTable from '$lib/components/Tables/TourDateTable.svelte';
    import NewTable from '$lib/components/Tables/NewTable.svelte';
    import WorksTable from '$lib/components/Tables/WorksTable.svelte';

    export let data: {
        about: About | null;
        releases: Release[];
        videos: Video[];
        tourDates: TourDate[];
        newPosts: (Release | Tour | TourDate | Video)[];
        products: Product[];
        works: Work[];
        siteLastUpdated: string;
    };

    const { about, releases, tourDates, videos, newPosts, products, works, siteLastUpdated } = data;

    const hasNewPosts = (newPosts ?? []).length > 0;
    const hasTourDates = (tourDates ?? []).length > 0;
    const hasWorks = (works ?? []).length > 0;
</script>

<svelte:head>
    <title>World Affairs AB</title>
    <meta name="description" content="World Affairs is a record label founded and owned by Yung Lean, based in Stockholm, Sweden. Featuring releases from Yung Lean, Bladee, and Jonatan Leandoer96." />
    <meta property="og:title" content="World Affairs AB" />
    <meta property="og:description" content="World Affairs is a record label founded in 2020 by Yung Lean, based in Stockholm, Sweden." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://worldaffairs.se/" />
    <meta property="og:image" content="https://worldaffairs.se/images/og.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="World Affairs AB" />
    <meta name="twitter:description" content="World Affairs is a record label founded in 2020 by Yung Lean, based in Stockholm, Sweden." />
    <meta name="twitter:image:src" content="https://worldaffairs.se/images/og.jpg" />
</svelte:head>

<main>
    <div class="main-inner-container">
        <Ticker />
        <hr />
        <ClockGroup />
        <hr />
        <Header {hasNewPosts} {hasTourDates} {hasWorks} />
        <hr />
        {#if hasNewPosts}
            <NewTable {newPosts} />
            <hr />
        {/if}
        <Store {products} />
        <hr />
        <MusicTable {releases} />
        <hr />
        <VideoTable {videos} />
        <hr />
        {#if hasTourDates}
            <TourDateTable {tourDates} />
            <hr />
        {/if}
        {#if hasWorks}
            <WorksTable {works} />
            <hr />
        {/if}
        <Newsletter />
        <hr />
        <Contact {about} />
        <hr />
        <Footer {siteLastUpdated} />
    </div>
</main>

<style lang="scss">
    main {
        margin: 20px;
        margin-top: 10px;
        overflow-x: hidden;

        @media (max-width: 800px) {
            margin: 10px;
        }

        .main-inner-container {
            max-width: 1600px;
            margin: 0 auto;
            width: 100%;
        }
    }
</style>
