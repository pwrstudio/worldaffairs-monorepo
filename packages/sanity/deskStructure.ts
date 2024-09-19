import {
    MdHome,
    MdMusicNote,
    MdCalendarToday,
    MdShop
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
                .title('Tour dates')
                .icon(MdCalendarToday)
                .child(
                    S.documentList()
                        .title('Tour dates')
                        .showIcons(true)
                        .filter('_type == $type')
                        .params({ type: 'tourDate' })
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