<script lang="ts">
    const {
        url,
        autoplay = false,
        loop = false,
    } = $props<{
        url: string;
        autoplay?: boolean;
        loop?: boolean;
    }>();

    function getEmbedUrl(raw: string): string | null {
        let videoId: string | null = null;
        let platform: 'youtube' | 'vimeo' | null = null;

        const ytMatch = raw.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        if (ytMatch) {
            videoId = ytMatch[1];
            platform = 'youtube';
        }

        const vimeoMatch = raw.match(/vimeo\.com\/(\d+)/);
        if (!platform && vimeoMatch) {
            videoId = vimeoMatch[1];
            platform = 'vimeo';
        }

        if (!videoId || !platform) return null;

        const params = new URLSearchParams();
        if (autoplay) params.set('autoplay', '1');
        if (loop) params.set('loop', '1');

        const query = params.toString() ? `?${params.toString()}` : '';

        if (platform === 'youtube') {
            params.set('rel', '0');
            if (loop) params.set('playlist', videoId);
            const ytQuery = params.toString() ? `?${params.toString()}` : '';
            return `https://www.youtube.com/embed/${videoId}${ytQuery}`;
        }

        return `https://player.vimeo.com/video/${videoId}${query}`;
    }

    const embedUrl = $derived(getEmbedUrl(url));
</script>

{#if embedUrl}
    <figure class="embed-slide">
        <iframe
            src={embedUrl}
            title="Embedded video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </figure>
{/if}

<style lang="scss">
    .embed-slide {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 1em;
        box-sizing: border-box;

        iframe {
            width: 100%;
            max-width: 960px;
            aspect-ratio: 16 / 9;
            border: none;
        }
    }
</style>
