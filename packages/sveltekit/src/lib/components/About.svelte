<script lang="ts">
  import type { About } from "@sanity-types"
  export let about: About
</script>

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

<style lang="scss">
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
</style>
