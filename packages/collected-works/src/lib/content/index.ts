import type { Exhibition as SanityExhibition } from '@sanity-types';

/**
 * Hardcoded exhibition content.
 *
 * The text fields are derived from the `exhibition` singleton in
 * packages/sanity/schemaTypes/Exhibition.ts, so renaming a field in the studio breaks
 * this file at compile time rather than quietly emptying the page. Typegen marks every
 * field optional (it cannot see validation rules); the page always renders these, so
 * they are required here.
 *
 * Run `pnpm typegen` from the repo root after changing the schema.
 */
type ExhibitionText = Required<
    Pick<
        SanityExhibition,
        | 'artist'
        | 'title'
        | 'yearStart'
        | 'startDate'
        | 'endDate'
        | 'venue'
        | 'openingHours'
        | 'admission'
    >
> &
    /** Omitted when the same as `yearStart` */
    Pick<SanityExhibition, 'yearEnd'>;

/** One `<source>` ahead of the `<img>`, for a format the browser may or may not read */
export interface ExhibitionArtworkSource {
    /** `image/avif`, `image/webp`, ... */
    type: string;
    srcset: string;
}

export interface ExhibitionArtwork {
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
    sources?: ExhibitionArtworkSource[];
    width: number;
    height: number;
}

export type Exhibition = ExhibitionText & { artwork: ExhibitionArtwork };

export const exhibition: Exhibition = {
    artist: 'Jonatan Leandoer Håstad',
    title: 'Collected Works',
    yearStart: 2016,
    yearEnd: 2026,
    startDate: '2026-09-25',
    endDate: '2026-10-11',
    venue: 'Torsgatan 22 Stockholm',
    openingHours: 'Open daily 10–19 except Mondays',
    admission: 'Free admission',
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
