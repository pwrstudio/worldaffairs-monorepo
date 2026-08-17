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
    type: 'index' | 'icon' | 'text' | 'linkList' | 'link';
    label?: string;
    key?: string;
    hide: boolean;
    /**
     * Keep this column's text on one line. In a table laid out automatically that also raises
     * the column's minimum width, so the browser gives it the room it needs and takes it from
     * whichever columns are still free to wrap.
     */
    nowrap?: boolean;
};

export type LinkListItem = {
    label: string;
    url: string;
};
