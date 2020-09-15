import './overlay.sass';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { h, SetupContext, withDirectives, vShow } from 'vue';

type OverlayPosition = 'is-left' | 'is-right' | 'is-centered';

export default defineComponent({
  name: 'b-overlay',
  props: {
    position: {
      type: String as PropType<OverlayPosition>,
      required: false
    },
    isActive: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    isFullscreen: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onClick: {
      type: Function as PropType<IO<void>>,
      required: false
    }
  },
  setup(props, { slots }) {
    return () => {
      if (props.isFullscreen) {
        return withDirectives(
          h(
            'div',
            {
              class: ['b-overlay', props.position]
            },
            [
              h('div', {
                class: 'b-overlay-background',
                onClick: props.onClick
              }),
              h(
                'div',
                {
                  class: 'b-overlay-content is-fullscreen'
                },
                slots.default && slots.default()
              )
            ]
          ),
          [[vShow, props.isActive]]
        );
      } else {
        return withDirectives(
          h(
            'div',
            {
              class: ['b-overlay', props.position]
            },
            [
              h('div', {
                onClick: props.onClick,
                class: 'b-overlay-background'
              }),
              h(
                'div',
                {
                  class: 'b-overlay-content'
                },
                slots.default && slots.default()
              )
            ]
          ),
          [[vShow, props.isActive]]
        );
      }
    };
  }
});
