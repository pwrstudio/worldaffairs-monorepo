<script lang="ts">
  import type { About, Release, Tour, Video } from "@sanity-types"

  import DataTable from "$lib/components/DataTable.svelte"

  export let data: {
    about: About
    releases: Release[]
    tours: Tour[]
    videos: Video[]
  }

  const { releases, tours, videos } = data

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

  const music = releases.map(mapRelease)
  const video = videos.map(mapVideo)
  const tour = tours.map(mapTour)
</script>

<div class="column">
  <div class="updated">Last updated: 2025-05-28 15:45</div>
  <div class="header">
    <img src="/images/wa-logo-alt.png" alt="logo" />
    <h1>World Affairs AB</h1>
    <div class="imprint">Momsregistreringsnummer (VAT): SE556123456701</div>
  </div>
  <hr />
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
  <p class="imprint">© 2025 World Affairs AB</p>
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

  h3 {
    color: var(--foreground);
  }

  h2 {
    margin-bottom: 0;
    margin-top: 0;
    color: var(--foreground);
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
    color: var(--foreground);
  }

  .imprint {
    font-size: var(--font-size-small);
    color: var(--foreground);
  }

  button {
    padding: 20px;
    cursor: pointer;
    font-family: "Times New Roman", Times, serif;
    font-size: var(--font-size-base);
    margin-bottom: 1em;
  }
</style>
