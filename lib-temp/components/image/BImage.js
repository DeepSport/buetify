import 'bulma/sass/elements/image.sass';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
export default function BImage(props, { attrs, slots }) {
    return h('figure', {
        ...attrs,
        class: mergeClasses(attrs.class, 'image')
    }, [
        h('img', {
            class: [
                props.imgClass,
                {
                    'is-rounded': props.isRounded
                }
            ],
            src: props.src,
            alt: props.alt
        })
    ]);
}
//# sourceMappingURL=BImage.js.map