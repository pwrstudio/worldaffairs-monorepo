<script lang="ts">
  import type { About, Release, Video, Tour, TourDate } from "@sanity-types"

  import Ticker from "$lib/components/Ticker/Ticker.svelte"
  import ClockGroup from "$lib/components/Clock/ClockGroup.svelte"
  import Header from "$lib/components/Header/Header.svelte"
  import Store from "$lib/components/Store/Store.svelte"
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
  <Contact {about} />
  <hr />
  <Footer {siteLastUpdated} />
</main>

<style lang="scss">
  main {
    margin: 20px;
    margin-top: 10px;
  }
</style>
