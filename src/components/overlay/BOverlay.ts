import './overlay.sass';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';

type OverlayPosition = 'is-left' | 'is-right' | 'is-centered';

export default Vue.extend({
  name: 'BOverlay',
  functional: true,
  props: {
    position: {
      type: String,
      default: 'is-centered'
    } as PropValidator<OverlayPosition>,
    isActive: {
      type: Boolean,
      required: true
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  render(h, { data, props, children }): VNode {
    function onClick(e: MouseEvent) {
      if (data.on && data.on.close) {
        Array.isArray(data.on.close) ? data.on.close.forEach(fn => fn(e)) : data.on.close(e);
      }
    }
    if (props.isFullscreen) {
      return h(
        'div',
        {
          staticClass: mergeVNodeStaticClass('b-overlay', data.staticClass),
          class: props.position,
          directives: [{ name: 'show', value: props.isActive }]
        },
        [
          h(
            'div',
            {
              staticClass: 'b-overlay-content is-fullscreen'
            },
            children
          )
        ]
      );
    } else {
      return h(
        'div',
        {
          staticClass: mergeVNodeStaticClass('b-overlay', data.staticClass),
          class: props.position,
          directives: [{ name: 'show', value: props.isActive }]
        },
        [
          h('div', {
            staticClass: 'b-overlay-background',
            on: {
              click: onClick
            }
          }),
          h(
            'div',
            {
              staticClass: 'b-overlay-content'
            },
            children
          )
        ]
      );
    }
  }
});
