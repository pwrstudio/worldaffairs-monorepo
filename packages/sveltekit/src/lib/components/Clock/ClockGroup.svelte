<script lang="ts">
    import type { ClockLocation } from '$lib/types';
    import Clock from '$lib/components/Clock/Clock.svelte';

    const clockLocations: ClockLocation[] = [
        { timezone: 'Europe/Stockholm', label: 'Stockholm' },
        { timezone: 'Europe/London', label: 'London' },
        { timezone: 'America/New_York', label: 'New York' },
        { timezone: 'America/Los_Angeles', label: 'Los Angeles' },
        { timezone: 'Asia/Bangkok', label: 'Bangkok' },
        { timezone: 'Asia/Tokyo', label: 'Tokyo' },
    ];
</script>

<div class="clock-group">
    {#each clockLocations as clockLocation}
        <div class="clock-container">
            <Clock {clockLocation} />
        </div>
    {/each}
</div>

<style lang="scss">
    .clock-group {
        display: flex;
        gap: 20px;
        justify-content: space-between;
    }

    @media (max-width: 960px) {
        .clock-container:nth-child(n + 5) {
            display: none;
        }
    }

    @media (max-width: 800px) {
        .clock-group {
            flex-direction: column;
            align-items: center;
            gap: unset;
        }

        .clock-container:not(:first-child) {
            display: none;
        }
    }
</style>
