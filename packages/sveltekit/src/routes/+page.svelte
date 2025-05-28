<script lang="ts">
  import type { About, Release, Tour, Video } from "@sanity-types"
  import DataTable from "$lib/components/DataTable.svelte"
  import TabView from "$lib/components/TabView.svelte"

  export let data: {
    about: About
    releases: Release[]
    tours: Tour[]
    videos: Video[]
  }

  const { releases, tours, videos } = data

  const tabs = [
    { id: "music", label: "Music" },
    { id: "video", label: "Video" },
    { id: "tour", label: "Tour" },
    { id: "store", label: "Store" },
    { id: "contact", label: "Contact" },
  ]

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

<div class="layout">
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <img src="/images/wa-logo-alt.png" alt="logo" />
        <h1>World Affairs AB</h1>
      </div>
      <div class="updated">Last updated: 2025-05-28 15:45</div>
    </div>
  </header>

  <main class="main-content">
    <TabView {tabs} let:activeTab>
      {#if activeTab === "music"}
        <DataTable title="Music" data={music} />
      {:else if activeTab === "video"}
        <DataTable title="Video" data={video} />
      {:else if activeTab === "tour"}
        <DataTable title="Tour" data={tour} />
      {:else if activeTab === "store"}
        <h3 id="store">Store</h3>
        <a
          href="https://store.worldaffairs.se/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>World Affairs AB Store</button>
        </a>
      {:else if activeTab === "contact"}
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
      {/if}
    </TabView>
  </main>

  <footer class="footer">
    <div class="imprint">Momsregistreringsnummer (VAT): SE556123456701</div>
    <div class="copyright">© 2025 World Affairs AB</div>
  </footer>
</div>

<style lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }

  .header {
    height: 80px;
    background: var(--background);
    border-bottom: 1px solid var(--line);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .header-content {
    height: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 60px;
      height: auto;
    }
  }

  .main-content {
    position: fixed;
    top: 80px;
    bottom: 20px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .footer {
    height: 40px;
    background: var(--background);
    border-top: 1px solid var(--line);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    font-size: var(--font-size-small);
    z-index: 100;
  }

  .updated {
    font-size: var(--font-size-small);
    color: var(--foreground);
  }

  h1 {
    margin: 0;
    color: var(--foreground);
    font-size: 1.5em;
  }

  h3 {
    color: var(--foreground);
  }

  .imprint {
    color: var(--foreground);
  }

  .copyright {
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
