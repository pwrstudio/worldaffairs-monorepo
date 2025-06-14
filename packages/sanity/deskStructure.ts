import {
    MdMusicNote,
    MdVideocam,
    MdTour,
    MdStar,
    MdHome,
    MdEvent
} from "react-icons/md"

export default (S: any) =>
    S.list()
        .title("World Affairs AB")
        .items([
            S.listItem()
            .title("About")
            .icon(MdHome)
            .child(
                S.editor()
                    .id('about')
                    .schemaType("about")
                    .documentId("about")
            ),
            S.divider(),
            S.listItem()
                .title("New posts")
                .icon(MdStar)
                .child(
                    S.editor()
                        .id('new-posts')
                        .schemaType("newPosts")
                        .documentId("new-posts")
                ),
            S.divider(),
            S.listItem()
                .title('Releases')
                .icon(MdMusicNote)
                .child(
                    S.documentList()
                        .title('Releases')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'release' })
                ),
            S.divider(),
            S.listItem()
                .title('Videos')
                .icon(MdVideocam)
                .child(
                    S.documentList()
                        .title('Videos')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'video' })
                ),
            S.divider(),
            S.listItem()
                .title('Tours')
                .icon(MdTour)
                .child(
                    S.documentList()
                        .title('Tours')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'tour' })
                ),
            S.divider(),
            S.listItem()
                .title('Tour dates')
                .icon(MdEvent)
                .child(
                    S.documentList()
                        .title('Tour dates')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'tourDate' })
                        .defaultOrdering([{field: 'date', direction: 'asc'}])
                ),
        ]);