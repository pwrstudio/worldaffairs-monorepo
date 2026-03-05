/**
 *  GROQ queries for Sanity CMS
 *  https://www.sanity.io/docs/groq
 */
export const queries = {
    // Combined query to fetch all data in one request
    allData: `{
        "about": *[_id == "about"][0],
        "releases": *[_type == "release"] | order(date desc),
        "videos": *[_type == "video"] | order(date desc),
        "tourDates": *[_type == "tourDate"] | order(date asc),
        "newPosts": *[_type == "newPosts"][0] {title, posts[]->{...}},
        "storeList": *[_type == "storeList"][0] {title, posts[]->{...}},
        "worksList": *[_type == "worksList"][0] {title, works[]->{...}}
    }`,

    // Single work by slug
    workBySlug: `*[_type == "work" && slug.current == $slug][0] {
        ...,
        media[] {
            _type, _key, caption, credits, year,
            image { ..., asset-> },
            file { ..., asset-> },
            url, autoplay, loop,
            poster { ..., asset-> }
        }
    }`,
};
