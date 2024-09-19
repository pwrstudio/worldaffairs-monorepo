// ICONS
import {
    MdHome,
    MdMusicNote
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
        ]);