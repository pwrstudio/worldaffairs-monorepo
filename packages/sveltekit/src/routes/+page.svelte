<script lang="ts">
  import type { About, Release, Tour, Video } from "@sanity-types"
  import DataTable from "$lib/components/DataTable.svelte"
  import AnalogueClock from "$lib/components/AnalogueClock.svelte"
  import CommodityMarquee from "$lib/components/CommodityMarquee.svelte"

  export let data: {
    about: About
    releases: Release[]
    tours: Tour[]
    videos: Video[]
    newPosts: (Release | Tour | Video)[]
  }

  const { releases, tours, videos, newPosts } = data

  // Common function to handle links
  function mapLinks(links?: Array<{ label?: string; url?: string }>) {
    return (
      links?.reduce((acc: Record<string, string>, link) => {
        if (link.label && link.url) {
          acc[link.label.toLowerCase()] = link.url
        }
        return acc
      }, {}) || {}
    )
  }

  // Map releases (includes type field)
  function mapRelease(release: Release) {
    return {
      title: release.title,
      type: release.type,
      artist: release.artist,
      releaseDate: release.releaseDate,
      ...mapLinks(release.links),
    }
  }

  // Map videos (no type field)
  function mapVideo(video: Video) {
    return {
      title: video.title,
      artist: video.artist,
      releaseDate: video.releaseDate,
      ...mapLinks(video.links),
    }
  }

  function mapTour(tour: Tour) {
    return {
      title: tour.title,
      artist: tour.artist,
      region: tour.region,
      tourDate: tour.tourDate,
      tickets: tour.link,
    }
  }

  function mapNewPost(post: any) {
    if (!post || typeof post !== "object") {
      throw new Error("Invalid post object")
    }

    if (post._type === "release") {
      return mapRelease(post)
    } else if (post._type === "video") {
      return mapVideo(post)
    } else if (post._type === "tour") {
      return mapTour(post)
    }
    throw new Error(`Unknown post type: ${post._type}`)
  }

  const music = releases.map(mapRelease)
  const video = videos.map(mapVideo)
  const tour = tours.map(mapTour)
  const newPostsMapped = newPosts?.map(mapNewPost) || []
</script>

<div class="column">
  <CommodityMarquee />
  <hr />
  <!-- Clocks -->
  <div class="clocks">
    <div class="clock-container">
      <AnalogueClock timezone="Europe/Stockholm" label="Stockholm" />
    </div>
    <div class="clock-container">
      <AnalogueClock timezone="Europe/London" label="London" />
    </div>
    <div class="clock-container">
      <AnalogueClock timezone="America/New_York" label="New York" />
    </div>
    <div class="clock-container">
      <AnalogueClock timezone="America/Los_Angeles" label="Los Angeles" />
    </div>
    <div class="clock-container">
      <AnalogueClock timezone="Asia/Bangkok" label="Bangkok" />
    </div>
    <div class="clock-container">
      <AnalogueClock timezone="Asia/Tokyo" label="Tokyo" />
    </div>
  </div>

  <hr />

  <div class="header">
    <div class="column">
      <h1>World Affairs AB</h1>
      <div class="imprint">Momsregistreringsnummer (VAT): SE556123456701</div>
      {#if newPostsMapped.length > 0}
        <h2 class="toc-link">
          <a href="#new">New</a>
        </h2>
      {/if}
      <h2 class="toc-link">
        <a href="#music">Music</a>
      </h2>
      <h2 class="toc-link">
        <a href="#video">Video</a>
      </h2>
      <h2 class="toc-link">
        <a href="#tour">Tour</a>
      </h2>
      <h2 class="toc-link">
        <a href="#store">Store</a>
      </h2>
      <h2 class="toc-link">
        <a href="#contact">Contact</a>
      </h2>
    </div>
    <div class="column image">
      <img src="/images/wa-logo-alt.png" alt="logo" />
      <img src="/images/wa-logo.png" alt="logo" />
    </div>
  </div>
  {#if newPostsMapped.length > 0}
    <hr />
    <DataTable title="New" data={newPostsMapped} isNew={true} />
  {/if}
  <hr />
  <DataTable title="Music" data={music} />
  <hr />
  <DataTable title="Video" data={video} />
  <hr />
  <DataTable title="Tour" data={tour} />
  <hr />
  <h3 id="store">Store</h3>
  <a
    href="https://store.worldaffairs.se/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button>World Affairs AB Store</button>
  </a>
  <hr />
  <h3 id="contact">Contact</h3>
  <p>
    <a href="mailto:info@worldaffairs.se">info@worldaffairs.se</a>
    <br />
    <a
      href="https://www.instagram.com/worldaffairsincorporated/"
      target="_blank"
      rel="noopener noreferrer">Instagram</a
    >
  </p>
  <hr />
  <div class="footer">
    <div class="imprint">© 2025 World Affairs AB</div>
    <div class="updated">Last updated: 2025-05-28 15:45</div>
  </div>
</div>

<style lang="scss">
  img {
    width: 340px;
    height: auto;
  }

  .updated {
    font-size: var(--font-size-small);
    color: var(--foreground);
    float: right;
  }

  .toc-link {
    display: block;
  }

  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .imprint {
    font-size: var(--font-size-small);
  }

  button {
    padding: 20px;
    cursor: pointer;
    font-family: "Times New Roman", Times, serif;
    font-size: var(--font-size-base);
    margin-bottom: 1em;
  }

  img.new {
    width: 24px;
    height: 24px;
  }

  .header-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);
    margin-bottom: 0.5em;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);
  }

  .clocks {
    // background: red;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    // margin-bottom: 1em;
    // border-bottom: 1px solid var(--foreground);
    // background: lightgray;

    .clock-container {
      // background: lightgray;
      // background: blue;
    }
  }

  .header {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    display: flex;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);
    margin-bottom: 0.5em;
    height: 280px;

    .column {
      width: 50%;
      height: 100%;
      padding-left: 10px;
      // border-right: 1px ridge var(--foreground);

      &.image {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:first-child {
        padding-left: 0;
        // display: flex;
        // align-items: center;
        // justify-content: center;
      }
    }

    img {
      max-height: 100%;
      width: auto;
    }
  }
</style>
