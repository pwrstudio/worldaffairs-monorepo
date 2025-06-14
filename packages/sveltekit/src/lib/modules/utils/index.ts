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