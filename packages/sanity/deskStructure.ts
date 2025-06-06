import {
    MdMusicNote,
    MdShop,
    MdVideocam,
    MdTour,
    MdStar
} from "react-icons/md"

export default (S: any) =>
    S.list()
        .title("World Affairs AB")
        .items([
            S.listItem()
                .title("New posts")
                .icon(MdStar)
                .child(
                    S.editor()
                        .id('new-posts')
                        .schemaType("newPosts")
                        .documentId("new-posts")
                ),
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
        ]);