<script lang="ts">
  import type { About, Release, TourDate, Product } from "@sanity-types"

  import Title from "$lib/components/Title.svelte"
  import Releases from "$lib/components/Releases.svelte"
  import TourDates from "$lib/components/TourDates.svelte"
  import Shop from "$lib/components/Shop.svelte"
  import AboutComponent from "$lib/components/About.svelte"

  export let data: {
    about: About
    releases: Release[]
    tourDates: TourDate[]
    products: Product[]
  }

  const { about, releases, tourDates, products } = data
</script>

<div class="column">
  <Title />
  <Releases {releases} />
  <TourDates {tourDates} />
  <Shop {products} />
  <AboutComponent {about} />
</div>

<style lang="scss">
  .column {
    text-align: center;
    width: 40ch;
    max-width: 85%;
  }
</style>
