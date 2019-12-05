import "../../../src/sass/helpers/animations.sass";
import "../../../src/components/tooltip/tooltip.sass";
import { h, defineComponent } from 'vue';
export default defineComponent({
  name: 'b-tooltip',
  props: {
    isActive: {
      type: Boolean
    },
    variant: {
      type: String,
      default: 'is-primary'
    },
    label: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'is-top'
    },
    isAlways: {
      type: Boolean,
      default: false
    },
    isAnimated: {
      type: Boolean,
      default: true
    },
    isSquare: {
      type: Boolean,
      default: false
    },
    isDashed: {
      type: Boolean,
      default: false
    },
    isMultiline: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'is-medium'
    },
    tag: {
      type: String,
      default: 'span'
    }
  },

  setup(props, {
    slots
  }) {
    return () => h(props.tag, {
      class: ['b-tooltip', props.variant, props.size, props.position, {
        'b-tooltip': props.isActive,
        'is-always': props.isAlways || props.isActive,
        'is-animated': props.isAnimated,
        'is-square': props.isSquare,
        'is-dashed': props.isDashed,
        'is-multiline': props.isMultiline
      }],
      'data-label': props.label
    }, slots.default ? slots.default() : undefined);
  }

});
//# sourceMappingURL=BTooltip.js.map