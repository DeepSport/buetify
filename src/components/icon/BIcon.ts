import './icon.sass';
import { isString } from '../../utils/helpers';
import { Component, SetupContext, h } from 'vue';
import { ColorVariant, ColorVariantFlags } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';

interface BIconProps {
  icon: Component;
  variant?: ColorVariant | ColorVariantFlags;
  isHoverable?: boolean;
  size?: SizeVariant;
  tag?: string | Component;
}

function convertVariant(variant: ColorVariant | ColorVariantFlags): string | ColorVariantFlags {
  if (isString(variant)) {
    return variant.replace('is', 'has-text');
  } else {
    const x: any = {};
    for (const k in variant) {
      const nk = k.replace('is', 'has-text');
      x[nk] = variant[k as ColorVariant];
    }
    return x;
  }
}

export default function BIcon(props: BIconProps, { attrs }: SetupContext) {
  return h(
    props.tag ?? ('span' as any),
    {
      ...attrs,
      class: ['icon', props.size, { 'is-hoverable': props.isHoverable }, convertVariant(props.variant || '')]
    },
    [h(props.icon, { class: props.size })]
  );
}
