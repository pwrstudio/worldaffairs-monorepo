<script lang="ts">
    import { getCurrentYear, getRandomNumberInRange } from '$lib/modules/utils';
    const { siteLastUpdated, pageLastUpdated }: { siteLastUpdated?: string; pageLastUpdated?: string } = $props();
</script>

<div class="footer">
    <div class="imprint">© {getCurrentYear()} World Affairs AB</div>
    {#if siteLastUpdated || pageLastUpdated}
        <div class="updated">
            {#if siteLastUpdated}
                <div class="updated-text">Site last updated: {siteLastUpdated}</div>
            {/if}
            {#if pageLastUpdated}
                <div class="updated-text">Page last updated: {pageLastUpdated}</div>
            {/if}
            <div class="updated-text">
                You are visitor number: {getRandomNumberInRange(10000, 99999)}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .footer {
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
        font-size: var(--font-size-small);
        color: var(--foreground);

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            padding-bottom: 1em;
        }

        .imprint {
            font-size: var(--font-size-small);
        }

        .updated {
            font-size: var(--font-size-small);
            color: var(--foreground);
            float: right;
            text-align: right;

            @media (max-width: 768px) {
                text-align: center;
            }
        }
    }
</style>
