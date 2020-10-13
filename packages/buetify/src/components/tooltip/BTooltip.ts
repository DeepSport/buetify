import './tooltip.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { h, defineComponent, PropType } from 'vue';

export type TooltipPosition = 'is-top' | 'is-bottom' | 'is-left' | 'is-right';

export default defineComponent({
  name: 'b-tooltip',
  props: {
    isActive: {
      type: Boolean as PropType<boolean>
    },
    variant: {
      type: String as PropType<ColorVariant>,
      default: 'is-primary' as const
    },
    label: {
      type: String as PropType<string>,
      required: true
    },
    position: {
      type: String as PropType<TooltipPosition>,
      default: 'is-top' as const
    },
    isAlways: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    isAnimated: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    isSquare: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    isDashed: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    isMultiline: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    size: {
      type: String as PropType<SizeVariant>,
      default: 'is-medium' as const
    },
    tag: {
      type: String as PropType<string>,
      default: 'span'
    }
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.tag,
        {
          class: [
            'b-tooltip',
            props.variant,
            props.size,
            props.position,
            {
              'b-tooltip': props.isActive,
              'is-always': props.isAlways || props.isActive,
              'is-animated': props.isAnimated,
              'is-square': props.isSquare,
              'is-dashed': props.isDashed,
              'is-multiline': props.isMultiline
            }
          ],
          'data-label': props.label
        },
        slots.default ? slots.default() : undefined
      );
  }
});
