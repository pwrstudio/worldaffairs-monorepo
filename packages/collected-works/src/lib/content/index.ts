import type {
    PosterInfo as SanityPosterInfo,
    ExhibitionText as SanityExhibitionText,
    SanityImageHotspot,
    SanityImageCrop,
} from '@sanity-types';

/**
 * The shapes the two pages render, and the shapes their GROQ projections return.
 *
 * Everything here is derived from the studio's own generated types rather than written out by
 * hand, so renaming a field in packages/sanity/schemaTypes/ breaks this file at compile time
 * instead of quietly emptying a page. Run `pnpm typegen:sanity` from the repo root after
 * changing either schema.
 *
 * Typegen marks every field optional, because it cannot see the schemas' validation rules.
 * The `*Result` types keep that optionality — it is what the API can really return — and each
 * loader narrows it to the non-optional render type below, failing the build with a readable
 * message rather than rendering a page full of `undefined`.
 */

/* ------------------------------------------------------------------ poster info */

/** What `posterInfoQuery` returns: the studio's own optionality, artwork left unresolved. */
export type PosterInfoResult = Pick<
    SanityPosterInfo,
    'artist' | 'title' | 'yearStart' | 'yearEnd' | 'visiting'
> & {
    artwork?: {
        alt?: string;
        caption?: string;
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        asset?: {
            _id: string;
            metadata?: { dimensions?: { width: number; height: number } };
        };
    };
};

/** The artwork as the poster wants it: URLs already built, ready for `<img>`. */
export interface PosterArtwork {
    /** Described for screen readers */
    alt: string;
    caption?: string;
    src: string;
    srcset: string;
    width: number;
    height: number;
}

/** The three stacked lines that head both pages */
export type Billing = Required<Pick<SanityPosterInfo, 'artist' | 'title' | 'yearStart'>> &
    /** Omitted when the same as `yearStart` */
    Pick<SanityPosterInfo, 'yearEnd'>;

export type BillingResult = Pick<SanityPosterInfo, 'artist' | 'title' | 'yearStart' | 'yearEnd'>;

export type PosterInfo = Billing &
    Required<Pick<SanityPosterInfo, 'visiting'>> & { artwork: PosterArtwork };

/* -------------------------------------------------------------- exhibition text */

/**
 * What `exhibitionTextQuery` returns. The page heads itself with the same billing as the
 * poster, so the projection pulls that from `posterInfo` in the same round trip.
 */
export type ExhibitionTextResult = {
    text: Pick<SanityExhibitionText, 'title' | 'author' | 'body'> | null;
    billing: BillingResult | null;
};

export type ExhibitionText = Required<Pick<SanityExhibitionText, 'title' | 'body'>> &
    /** Omitted to print the text unsigned */
    Pick<SanityExhibitionText, 'author'>;
