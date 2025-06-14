<script lang="ts">
  import type { About, Release, Video, Tour, TourDate } from "@sanity-types"

  import Ticker from "$lib/components/Ticker/Ticker.svelte"
  import ClockGroup from "$lib/components/Clock/ClockGroup.svelte"
  import Header from "$lib/components/Header/Header.svelte"
  import Store from "$lib/components/Store/Store.svelte"
  import Newsletter from "$lib/components/NewsLetter/NewsLetter.svelte"
  import Contact from "$lib/components/Contact/Contact.svelte"
  import Footer from "$lib/components/Footer/Footer.svelte"

  import MusicTable from "$lib/components/Tables/MusicTable.svelte"
  import VideoTable from "$lib/components/Tables/VideoTable.svelte"
  import TourDateTable from "$lib/components/Tables/TourDateTable.svelte"
  import NewTable from "$lib/components/Tables/NewTable.svelte"

  export let data: {
    about: About
    releases: Release[]
    videos: Video[]
    tourDates: TourDate[]
    newPosts: (Release | Tour | TourDate | Video)[]
    siteLastUpdated: string
  }

  const { about, releases, tourDates, videos, newPosts, siteLastUpdated } = data

  const hasNewPosts = newPosts.length > 0
</script>

<main>
  <div class="main-inner-container">
    <Ticker />
    <hr />
    <ClockGroup />
    <hr />
    <Header {hasNewPosts} />
    <hr />
    {#if hasNewPosts}
      <NewTable {newPosts} />
      <hr />
    {/if}
    <Store />
    <hr />
    <MusicTable {releases} />
    <hr />
    <VideoTable {videos} />
    <hr />
    <TourDateTable {tourDates} />
    <hr />
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

    @media (max-width: 768px) {
      margin: 10px;
    }

    .main-inner-container {
      max-width: 1600px;
      margin: 0 auto;
      width: 100%;
    }
  }
</style>
