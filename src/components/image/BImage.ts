import 'bulma/sass/elements/image.sass';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';
export default Vue.extend({
  name: 'BImage',
  functional: true,
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: false
    },
    imgClass: {
      required: false,
      default: ''
    }
  },
  render(h, { data, props }): VNode {
    return h(
      'figure',
      {
        ...data,
        staticClass: mergeVNodeStaticClass('image', data.staticClass)
      },
      [
        h('img', {
          class: [
            props.imgClass,
            {
              'is-rounded': props.isRounded
            }
          ],
          attrs: {
            src: props.src,
            alt: props.alt
          }
        })
      ]
    );
  }
});
