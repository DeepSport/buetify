import "../../../src/components/tooltip/tooltip.sass";
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
export default function BTooltip(props, {
  attrs,
  slots
}) {
  return h(props.tag || 'span', Object.assign(Object.assign({}, attrs), {
    class: mergeClasses(attrs.class, [props.variant || 'is-primary', props.size, props.position || 'is-top', {
      'b-tooltip': !!props.isActive,
      'is-always': !!props.isAlways,
      'is-animated': !!props.isAnimated,
      'is-square': !!props.isSquare,
      'is-dashed': !!props.isDashed,
      'is-multilined': !!props.isMultilined
    }]),
    'data-label': props.label
  }), slots.default ? slots.default() : undefined);
}
//# sourceMappingURL=BTooltip.js.map