import { AllColorsVariant } from '../../../types/ColorVariants';
import { mergeVNodeStaticClass } from '../../../utils/mergeVNodeStaticClass';
import Vue, { PropType, VNode } from 'vue';
import BField from './BField';
export default Vue.extend({
  name: 'BFieldBody',
  functional: true,
  props: {
    message: {
      type: String
    },
    variant: {
      type: [String, Object] as PropType<AllColorsVariant | { [K in AllColorsVariant]: boolean }>
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  render(h, { data, props, slots }): VNode {
    return h(
      props.tag,
      { staticClass: mergeVNodeStaticClass('field-body', data.staticClass) },
      slots().default.map((element: VNode) => {
        // skip returns and comments
        if (!element.tag) {
          return element;
        }
        if (props.message) {
          return h(BField, { attrs: { message: props.message, variant: props.variant } }, [element]);
        }
        return h(BField, { attrs: { type: props.variant } }, [element]);
      })
    );
  }
});
