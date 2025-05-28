import {
    MdHome,
    MdMusicNote,
    MdShop,
    MdVideocam,
    MdTour
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
            S.listItem()
                .title('Shop')
                .icon(MdShop)
                .child(
                    S.documentList()
                        .title('Shop')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'product' })
                ),
        ]);