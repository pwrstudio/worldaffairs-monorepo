<script lang="ts">
  import type { About, Release, Video, Tour, TourDate } from "@sanity-types"
  import { TableType } from "$lib/components/enums"
  import {
    mapRelease,
    mapVideo,
    mapTourDate,
    mapNewPost,
  } from "$lib/modules/utils"

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
    videos: Video[]
    tours: Tour[]
    tourDates: TourDate[]
    newPosts: (Release | Tour | Video)[]
    siteLastUpdated: string
  }

  const { about, releases, tourDates, videos, newPosts, siteLastUpdated } = data

  const musicMapped = releases.map(mapRelease)
  const videoMapped = videos.map(mapVideo)
  const tourDatesMapped = tourDates.map(mapTourDate)
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
    <DataTable tableType={TableType.New} title="New" data={newPostsMapped} />
    <hr />
  {/if}
  <DataTable tableType={TableType.Music} title="Music" data={musicMapped} />
  <hr />
  <DataTable tableType={TableType.Video} title="Video" data={videoMapped} />
  <hr />
  <DataTable
    tableType={TableType.TourDates}
    title="Tour dates"
    data={tourDatesMapped}
  />
  <hr />
  <Store />
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
