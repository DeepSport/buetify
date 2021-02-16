import './icon.sass';
import { isString } from '../../utils/helpers';
import { h, defineComponent, PropType, ExtractPropTypes } from 'vue';
import { ColorVariant, ColorVariantFlags } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';

function convertVariant(variant: ColorVariant | ColorVariantFlags): string | ColorVariantFlags {
  if (isString(variant)) {
    return variant.replace('is', 'has-text');
  } else {
    // eslint-disable-next-line
    const x: any = {};
    for (const k in variant) {
      const nk = k.replace('is', 'has-text');
      x[nk] = variant[k as ColorVariant];
    }
    return x;
  }
}

export const BIconPropsDefinition = {
  variant: {
    type: String as PropType<ColorVariant>,
    default: '' as const
  },
  size: {
    type: String as PropType<SizeVariant>,
    default: '' as const
  },
  tag: {
    type: String,
    default: 'span'
  }
};

export type BIconProps = ExtractPropTypes<typeof BIconPropsDefinition>;

export default defineComponent({
  name: 'b-icon',
  props: BIconPropsDefinition,
  setup(props, { slots }) {
    return () =>
      h(
        // eslint-disable-next-line
        props.tag,
        {
          class: ['icon', props.size, convertVariant(props.variant)]
        },
        // eslint-disable-next-line
        slots.default && slots.default()
      );
  }
});
