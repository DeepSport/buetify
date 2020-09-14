import './icon.sass';
import { isString } from '../../utils/helpers';
import { Component, SetupContext, h } from 'vue';
import { ColorVariant, ColorVariantFlags } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';

export interface BIconProps {
  variant?: ColorVariant | ColorVariantFlags;
  isHoverable?: boolean;
  size?: SizeVariant;
  tag?: string | Component;
}

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

export default function BIcon(props: BIconProps, { attrs, slots }: SetupContext) {
  return h(
    // eslint-disable-next-line
    props.tag ?? ('span' as any),
    {
      ...attrs,
      class: ['icon', props.size, { 'is-hoverable': props.isHoverable }, convertVariant(props.variant || '')]
    },
    // eslint-disable-next-line
    slots.default!()
  );
}
