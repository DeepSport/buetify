import './icon.sass';
import { isString } from '../../utils/helpers';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { ColorVariant, ColorVariantFlags } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';

export default Vue.extend({
  name: 'BIcon',
  functional: true,
  props: {
    variant: ({
      type: [String, Object],
      default: ''
    } as unknown) as PropValidator<ColorVariant | ColorVariantFlags>,
    icon: {
      type: [Function, Object]
    },
    isHoverable: {
      type: Boolean,
      default: false
    },
    size: ({
      type: String,
      default: ''
    } as unknown) as PropValidator<SizeVariant>,
    tag: {
      type: [String, Function],
      default: 'span'
    },
    iconClass: null as any
  },
  render(h, context): VNode {
    const staticClass = mergeVNodeStaticClass('icon', context.data.staticClass);

    const newClass = mergeVNodeClasses(context.data.class, [
      context.props.size,
      context.props.iconClass,
      { 'is-hoverable': context.props.isHoverable },
      convertStringVariant(context.props.variant)
    ]);

    return h(context.props.tag, { ...context.data, staticClass, class: newClass }, [
      h(context.props.icon, {
        class: [context.props.size, context.props.iconClass]
      })
    ]);
  }
});

function convertStringVariant(variant: ColorVariant | ColorVariantFlags): string | ColorVariantFlags {
  return isString(variant) ? variant.replace('is', 'has-text') : variant;
}
