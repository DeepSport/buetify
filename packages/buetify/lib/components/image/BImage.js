import 'bulma/sass/elements/image.sass';
import { h } from 'vue';
export default function BImage(props, {
  attrs
}) {
  return h('figure', { ...attrs,
    class: 'image'
  }, [h('img', {
    class: [props.imgClass, {
      'is-rounded': props.isRounded
    }],
    src: props.src,
    alt: props.alt
  })]);
}
//# sourceMappingURL=BImage.js.map