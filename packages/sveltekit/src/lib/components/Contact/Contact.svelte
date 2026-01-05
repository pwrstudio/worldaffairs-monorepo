<script lang="ts">
    import type { About } from '@sanity-types';
    const { about }: { about: About | null } = $props();
</script>

<h3 id="contact">Contact</h3>
{#if about}
    <p>
        <a href="mailto:{about.contactEmail}">{about.contactEmail}</a>
        {#if about.contactLinks}
            <br />
            {#each about.contactLinks as link}
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                </a>
                <br />
            {/each}
        {/if}
    </p>
{/if}
