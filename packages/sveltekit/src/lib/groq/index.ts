/** 
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */
export const queries = {
    about: '*[_id == "about"][0]',
    releases: '*[_type == "release"] | order(releaseDate desc)'
}