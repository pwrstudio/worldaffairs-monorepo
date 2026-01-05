<script lang="ts">
    import type { ClockLocation } from '$lib/types';
    import { onMount } from 'svelte';

    const { clockLocation }: { clockLocation: ClockLocation } = $props();

    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);
    let date = $state('loading...');
    let isLoading = $state(true);

    function updateTime() {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            timeZone: clockLocation.timezone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        };

        const dateOptions: Intl.DateTimeFormatOptions = {
            timeZone: clockLocation.timezone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        const timeString = now.toLocaleTimeString('en-US', options);
        const [h, m, s] = timeString.split(':').map(Number);

        hours = h;
        minutes = m;
        seconds = s;
        date = now.toLocaleDateString('en-US', dateOptions);
        isLoading = false;
    }

    onMount(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });

    let hourRotation = $derived((hours % 12) * 30 + minutes * 0.5);
    let minuteRotation = $derived(minutes * 6 + seconds * 0.1);
    let secondRotation = $derived(seconds * 6);
</script>

<div class="clock-container">
    <div class="label">{clockLocation.label}</div>
    <div class="clock-wrapper">
        <svg viewBox="0 0 100 100" class="clock" class:visible={!isLoading}>
            <!-- Clock face -->
            <circle
                cx="50"
                cy="50"
                r="48"
                fill="var(--background)"
                stroke="var(--clock-color)"
                stroke-width="1"
            />

            <!-- Numbers -->
            {#each Array(12) as _, i}
                {@const angle = i * 30 * (Math.PI / 180)}
                {@const number = i === 0 ? 12 : i}
                {@const x = 50 + 35 * Math.sin(angle)}
                {@const y = 50 - 35 * Math.cos(angle)}
                <text
                    {x}
                    {y}
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="var(--clock-color)"
                    font-size="6"
                    font-family="system-ui"
                >
                    {number}
                </text>
            {/each}

            <!-- Hour markers -->
            {#each Array(12) as _, i}
                {@const angle = i * 30 * (Math.PI / 180)}
                {@const x1 = 50 + 45 * Math.sin(angle)}
                {@const y1 = 50 - 45 * Math.cos(angle)}
                {@const x2 = 50 + 40 * Math.sin(angle)}
                {@const y2 = 50 - 40 * Math.cos(angle)}
                <line {x1} {y1} {x2} {y2} stroke="var(--clock-color)" stroke-width="2" />
            {/each}

            <!-- Hour hand -->
            <line
                x1="50"
                y1="50"
                x2="50"
                y2="25"
                stroke="var(--clock-color)"
                stroke-width="3"
                transform="rotate({hourRotation}, 50, 50)"
            />

            <!-- Minute hand -->
            <line
                x1="50"
                y1="50"
                x2="50"
                y2="20"
                stroke="var(--clock-color)"
                stroke-width="2"
                transform="rotate({minuteRotation}, 50, 50)"
            />

            <!-- Second hand -->
            <g transform="rotate({secondRotation}, 50, 50)">
                <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="15"
                    stroke="var(--clock-color)"
                    stroke-width="1"
                />
                <circle cx="50" cy="50" r="2" fill="var(--clock-color)" />
            </g>

            <!-- Center dot -->
            <circle cx="50" cy="50" r="3" fill="var(--clock-color)" />
        </svg>
    </div>
    <div class="date">{date}</div>
</div>

<style lang="scss">
    .clock-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
        margin-top: 0;
        margin-bottom: 0;
        text-align: center;
    }

    .label {
        font-size: var(--font-size-base);
        color: var(--clock-color);
        margin-bottom: 0.5rem;
        font-weight: bold;
        white-space: nowrap;
    }

    .date {
        font-size: var(--font-size-small);
        margin-top: 0.5rem;
        color: var(--clock-color);
    }

    .clock-wrapper {
        width: 100%;
        max-height: 140px;
        aspect-ratio: 1;

        @media (max-width: 768px) {
            max-height: 200px;
        }
    }

    .clock {
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.3s ease-in-out,
            visibility 0.3s ease-in-out;

        &.visible {
            opacity: 1;
            visibility: visible;
        }
    }
</style>
