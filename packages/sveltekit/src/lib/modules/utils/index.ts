import type { Release, Video, Tour } from "@sanity-types"

// ================================
// Map CMS data to table format
// ================================

  /**
   * Map releases 
   * @param release - Release object
   * @returns Object with title, type, artist, releaseDate, and links
   */
  export function mapRelease(release: Release) {
    return {
      title: release.title,
      type: release.type,
      artist: release.artist,
      releaseDate: release.releaseDate,
      ...mapLinks(release.links),
    }
  }

  /**
   * Map videos (no type field)
   * @param video - Video object
   * @returns Object with title, artist, releaseDate, and links
   */
  export function mapVideo(video: Video) {
    return {
      title: video.title,
      artist: video.artist,
      releaseDate: video.releaseDate,
      ...mapLinks(video.links),
    }
  }

  /**
   * Map tours
   * @param tour - Tour object
   * @returns Object with title, artist, region, tourDate, and tickets
   */
  export function mapTour(tour: Tour) {
    return {
      title: tour.title,
      artist: tour.artist,
      region: tour.region,
      tourDate: tour.tourDate,
      tickets: tour.link,
    }
  }

  /**
   * Map new posts
   * @param post - Post object
   * @returns Object with title, type, artist, releaseDate, and links
   */
  export function mapNewPost(post: any) {
    if (!post || typeof post !== "object") {
      throw new Error("Invalid post object")
    }

    if (post._type === "release") {
      return mapRelease(post)
    } else if (post._type === "video") {
      return mapVideo(post)
    } else if (post._type === "tour") {
      return mapTour(post)
    }
    throw new Error(`Unknown post type: ${post._type}`)
  }

  /**
   * Common function to handle links
   * @param links - Array of links
   * @returns Object with label as key and url as value
   */
    function mapLinks(links?: Array<{ label?: string; url?: string }>) {
        return (
            links?.reduce((acc: Record<string, string>, link) => {
            if (link.label && link.url) {
                acc[link.label.toLowerCase()] = link.url
            }
            return acc
            }, {}) || {}
        )
    }


  // ================================
  // Misc. helpers
  // ================================

  /**
   * Check if a string is a valid URL
   * @param str - String to check
   * @returns True if the string is a valid URL, false otherwise
   */
    export function isUrl(str: string): boolean {
      try {
        new URL(str)
        return true
      } catch {
        return false
      }
    }

    /**
     * Get unique keys from an array of objects
     * @param data - Array of objects
     * @returns Array of unique keys
     */
    export function getUniqueKeys(data: Record<string, any>[]): string[] {
      return [
        ...new Set<string>(
          data.flatMap((obj: Record<string, any>) => Object.keys(obj))
        ),
      ]
    }

    /**
     * Get the current year
     * @returns Current year
     */
    export function getCurrentYear(): number {
      return new Date().getFullYear()
    }