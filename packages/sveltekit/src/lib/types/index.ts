export type ClockLocation = {
    timezone: string;
    label: string;
};

export type Commodity = {
    name: string;
    price: number;
    change: number;
};

export type Column = {
    type: 'index' | 'icon' | 'text' | 'linkList' | 'link' | 'internalLink';
    label?: string;
    key?: string;
    hide: boolean;
    linkPath?: string;
};

export type LinkListItem = {
    label: string;
    url: string;
};
