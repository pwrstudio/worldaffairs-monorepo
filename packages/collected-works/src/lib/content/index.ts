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

/* --------------------------------------------------------------------- artwork */

/**
 * The painting as the queries project it. One type for both, because both pages need it —
 * the poster to print it, the About page only to share itself with it. The About query asks
 * for the two fields `buildShareImage()` reads and stops there; the poster query fills in
 * `caption`, `hotspot`, `crop` and the asset's dimensions on top. Anything a page did not ask
 * for is absent, which is why everything below is optional.
 */
export type ArtworkResult = {
    alt?: string;
    caption?: string;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    asset?: {
        _id: string;
        metadata?: { dimensions?: { width: number; height: number } };
    };
};

/* ------------------------------------------------------------------ poster info */

/** What `posterInfoQuery` returns: the studio's own optionality, artwork left unresolved. */
export type PosterInfoResult = Pick<
    SanityPosterInfo,
    'artist' | 'title' | 'yearStart' | 'yearEnd' | 'visiting'
> & {
    artwork?: ArtworkResult;
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

/* ------------------------------------------------------------------ the share card */

/**
 * The single image both pages are shared with, built once by `buildShareImage()`.
 *
 * The dimensions and the media type travel with the URL rather than being written out again
 * in the `<Meta>` component, because it is the builder that decides them — a crawler is told
 * exactly what it is about to fetch, and the two cannot drift apart.
 */
export interface ShareImage {
    url: string;
    /** Described for anyone reading the card with a screen reader */
    alt: string;
    width: number;
    height: number;
    /** An `og:image:type`, e.g. `image/jpeg` */
    type: string;
}

/* ------------------------------------------------------------------------ about */

/*
    The studio type behind this page is still called `exhibitionText`: `about` was already
    taken by the main site's own singleton, and the two share one studio. Only the id is
    legacy — it reads as "About" everywhere an editor or a visitor sees it.
*/

/**
 * What `aboutQuery` returns. The page heads itself with the same billing as the poster and
 * shares itself with the same artwork, so the projection pulls both from `posterInfo` in the
 * same round trip.
 */
export type AboutResult = {
    about: Pick<SanityExhibitionText, 'title' | 'author' | 'body'> | null;
    posterInfo: (BillingResult & { artwork?: ArtworkResult }) | null;
};

export type About = Required<Pick<SanityExhibitionText, 'title' | 'body'>> &
    /** Omitted to print the text unsigned */
    Pick<SanityExhibitionText, 'author'>;
