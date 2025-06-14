<script lang="ts">
  import type { About, Release, Tour, Video } from "@sanity-types"
  import { mapRelease, mapVideo, mapTour, mapNewPost } from "$lib/modules/utils"

  import Ticker from "$lib/components/Ticker/Ticker.svelte"
  import ClockGroup from "$lib/components/Clock/ClockGroup.svelte"
  import Header from "$lib/components/Header/Header.svelte"
  import DataTable from "$lib/components/DataTable/DataTable.svelte"
  import Store from "$lib/components/Store/Store.svelte"
  import Contact from "$lib/components/Contact/Contact.svelte"
  import Footer from "$lib/components/Footer/Footer.svelte"

  export let data: {
    about: About
    releases: Release[]
    tours: Tour[]
    videos: Video[]
    newPosts: (Release | Tour | Video)[]
  }

  const { about, releases, tours, videos, newPosts } = data

  const music = releases.map(mapRelease)
  const video = videos.map(mapVideo)
  const tour = tours.map(mapTour)
  const newPostsMapped = newPosts?.map(mapNewPost) || []
  const hasNewPosts = newPostsMapped.length > 0
</script>

<main>
  <Ticker />
  <hr />
  <ClockGroup />
  <hr />
  <Header {hasNewPosts} />
  <hr />
  {#if hasNewPosts}
    <DataTable title="New" data={newPostsMapped} isNew={true} />
    <hr />
  {/if}
  <DataTable title="Music" data={music} />
  <hr />
  <DataTable title="Video" data={video} />
  <hr />
  <DataTable title="Tour" data={tour} />
  <hr />
  <Store />
  <hr />
  <Contact {about} />
  <hr />
  <Footer />
</main>

<style lang="scss">
  main {
    margin: 20px;
    margin-top: 10px;
  }
</style>
