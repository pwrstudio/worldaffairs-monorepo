<script lang="ts">
  import type { About, Release } from "@sanity-types"

  export let data: {
    about: About
    releases: Release[]
  }

  const { about, releases } = data
</script>

<div class="column">
  <!-- TITLE -->
  <div class="title">
    <h1>World Affairs AB</h1>
  </div>
  <!-- RELEASES -->
  <div class="releases">
    {#each releases as release}
      <div class="release-item">
        <a href={release.link} target="__blank">{release.title}</a>
      </div>
    {/each}
  </div>
  <!-- ABOUT-->
  <div class="about">
    <!-- CEO -->
    <div class="about-section">
      <div class="label">{about.ceoLabel}</div>
      <div class="value">{about.ceoName}</div>
    </div>
    <!-- CONTACT -->
    <div class="about-section">
      <div class="label">{about.contactLabel}</div>
      <div class="value">
        <a href={`mailto:${about.contactEmail}`}>
          {about.contactEmail}
        </a>
      </div>
      <div class="value">
        <a
          href={`https://www.instagram.com/${about.contactInstagram}`}
          target="_blank"
        >
          @{about.contactInstagram}
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .column {
    text-align: center;

    .releases {
      margin-bottom: 1em;
    }

    .about {
      font-size: var(--font-size-small);
      font-family: var(--font-stack-mono);

      .about-section {
        margin-bottom: 1em;
        .label {
          font-weight: bold;
        }
      }
    }
  }
</style>
