import type {
    PosterInfo as SanityPosterInfo,
    ExhibitionText as SanityExhibitionText,
} from '@sanity-types';

/**
 * Hardcoded content for the two collected-works singletons.
 *
 * Both shapes are derived from the studio's own types rather than written out by hand, so
 * renaming a field in packages/sanity/schemaTypes/ breaks this file at compile time instead
 * of quietly emptying a page. Typegen marks every field optional (it cannot see validation
 * rules); the pages always render these, so they are required here.
 *
 * Run `pnpm typegen:sanity` from the repo root after changing either schema.
 */

/* ------------------------------------------------------------------ poster info */

type PosterInfoText = Required<
    Pick<SanityPosterInfo, 'artist' | 'title' | 'yearStart' | 'visiting'>
> &
    /** Omitted when the same as `yearStart` */
    Pick<SanityPosterInfo, 'yearEnd'>;

/** One `<source>` ahead of the `<img>`, for a format the browser may or may not read */
export interface PosterArtworkSource {
    /** `image/avif`, `image/webp`, ... */
    type: string;
    srcset: string;
}

export interface PosterArtwork {
    /** Described for screen readers */
    alt: string;
    caption?: string;
    /** Static asset for now; becomes a Sanity image URL via `urlFor()` later */
    src: string;
    srcset?: string;
    /**
     * Offered before `src`, most efficient format first. Sanity serves this from one URL
     * with `auto=format`, so this drops away when the artwork moves to the studio.
     */
    sources?: PosterArtworkSource[];
    width: number;
    height: number;
}

export type PosterInfo = PosterInfoText & { artwork: PosterArtwork };

export const posterInfo: PosterInfo = {
    artist: 'Jonatan Leandoer Håstad',
    title: 'Collected Works',
    yearStart: 2016,
    yearEnd: 2026,
    /*
        One paragraph per line on the poster. Written out as Portable Text so it matches what
        the studio will return, which is why each block carries the `_type`/`_key`/`markDefs`
        a real block would.
    */
    visiting: [
        '25 September – 11 October 2026',
        'Torsgatan 22 Stockholm',
        'Open daily 10–19 except Mondays',
        'Free admission',
    ].map((text, i) => ({
        _type: 'block' as const,
        _key: `visiting-${i}`,
        style: 'normal' as const,
        markDefs: [],
        children: [{ _type: 'span' as const, _key: `visiting-${i}-0`, text, marks: [] }],
    })),
    artwork: {
        alt:
            'Expressionist oil painting on a deep red ground: pale pink figures entangled at the centre, ' +
            'flanked by tall black and white masked figures, with sharp black forms overhead.',
        src: '/artwork-1250.jpg',
        srcset:
            '/artwork-640.jpg 640w, /artwork-900.jpg 900w, /artwork-1250.jpg 1250w, ' +
            '/artwork-1600.jpg 1600w, /artwork-2000.jpg 2000w',
        sources: [
            {
                type: 'image/avif',
                srcset:
                    '/artwork-640.avif 640w, /artwork-900.avif 900w, /artwork-1250.avif 1250w, ' +
                    '/artwork-1600.avif 1600w, /artwork-2000.avif 2000w',
            },
        ],
        width: 1250,
        height: 1250,
    },
};

/* -------------------------------------------------------------- exhibition text */

export type ExhibitionText = Required<Pick<SanityExhibitionText, 'title' | 'body'>> &
    /** Omitted to print the text unsigned */
    Pick<SanityExhibitionText, 'author'>;

/*
    PLACEHOLDER COPY — not the real exhibition text. It is here so the route renders and
    prerenders while the studio document is still empty; replace it, or switch the loader in
    src/routes/exhibition-text/+page.ts over to Sanity once the document exists.

    Written as Portable Text so it matches what the studio will return, which is why each
    block carries the `_type`/`_key`/`markDefs` a real block would.
*/
export const exhibitionText: ExhibitionText = {
    title: 'Collected Works',
    author: undefined,
    body: [
        {
            _type: 'block',
            _key: 'placeholder-1',
            style: 'normal',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: 'placeholder-1-0',
                    text: 'Placeholder text. The exhibition text has not been written into the studio yet — this paragraph stands in for it so the page has something to lay out.',
                    marks: [],
                },
            ],
        },
        {
            _type: 'block',
            _key: 'placeholder-2',
            style: 'normal',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: 'placeholder-2-0',
                    text: 'A second paragraph, to show the spacing between them and the measure the column sets for running prose.',
                    marks: [],
                },
            ],
        },
    ],
};
