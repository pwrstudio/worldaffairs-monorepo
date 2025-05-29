<script lang="ts">
  import type { About, Release, Tour, Video } from "@sanity-types"
  import DataTable from "$lib/components/DataTable.svelte"
  import { onMount } from "svelte"

  export let data: {
    about: About
    releases: Release[]
    tours: Tour[]
    videos: Video[]
    newPosts: (Release | Tour | Video)[]
  }

  let stockholmTime = ""

  function updateStockholmTime() {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Stockholm",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }
    stockholmTime = now.toLocaleTimeString("en-US", options)
  }

  onMount(() => {
    updateStockholmTime()
    const interval = setInterval(updateStockholmTime, 1000)
    return () => clearInterval(interval)
  })

  const { releases, tours, videos, newPosts } = data

  console.log(newPosts)

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
  <div class="header">
    <div class="header-bar">
      <div class="clock">Stockholm: {stockholmTime}</div>
    </div>
    <img src="/images/wa-logo-alt.png" alt="logo" />
    <h1>World Affairs AB</h1>
    <div class="imprint">Momsregistreringsnummer (VAT): SE556123456701</div>
  </div>
  <hr />
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

  .clock {
    font-size: var(--font-size-small);
    color: var(--foreground);
    // float: right;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);
  }

  .header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    font-size: var(--font-size-small);
    color: var(--foreground);
    margin-bottom: 0.5em;
  }
</style>
