export type ViewMode = 'slideshow' | 'text' | 'grid';

export type MediaItem = {
    _type: string;
    _key: string;
    caption?: string;
    image?: any;
    file?: { asset: { url: string } };
};
