import "../../../src/components/overlay/overlay.sass";
import { h, withDirectives, vShow, defineComponent } from 'vue';
export default defineComponent({
  name: 'b-overlay',
  props: {
    position: {
      type: String,
      required: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      required: false
    }
  },

  setup(props, {
    slots
  }) {
    return () => {
      if (props.isFullscreen) {
        return withDirectives(h('div', {
          class: ['b-overlay', props.position]
        }, [h('div', {
          class: 'b-overlay-background',
          onClick: props.onClick
        }), h('div', {
          class: 'b-overlay-content is-fullscreen'
        }, slots.default && slots.default())]), [[vShow, props.isActive]]);
      } else {
        return withDirectives(h('div', {
          class: ['b-overlay', props.position]
        }, [h('div', {
          onClick: () => {
            console.log('overlay background-click');
            props.onClick && props.onClick();
          },
          class: 'b-overlay-background'
        }), h('div', {
          class: 'b-overlay-content'
        }, slots.default && slots.default())]), [[vShow, props.isActive]]);
      }
    };
  }

});
//# sourceMappingURL=BOverlay.js.map