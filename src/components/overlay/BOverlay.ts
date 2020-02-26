import './overlay.sass';
import { mapVNodeListenersToNative } from '../../utils/mapVNodeListenersToNative';
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
          on: mapVNodeListenersToNative('click', 'close', data.on)
        }),
        h(
          'div',
          {
            staticClass: 'b-overlay-content',
            class: { 'is-fullscreen': props.isFullscreen }
          },
          children
        )
      ]
    );
  }
});
