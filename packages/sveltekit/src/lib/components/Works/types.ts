export type ViewMode = 'slideshow' | 'table';

export type MediaItem = {
    _type: string;
    _key: string;
    caption?: string;
    credits?: string;
    year?: number;
    image?: any;
    poster?: any;
    file?: { asset: { url: string } };
    url?: string;
    autoplay?: boolean;
    loop?: boolean;
};
