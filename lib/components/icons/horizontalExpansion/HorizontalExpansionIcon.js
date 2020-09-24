import "../../../../src/components/icons/horizontalExpansion/horizontal-expansion-icon.sass";
import { h } from 'vue';
import { mergeClasses } from '../../../utils/mergeClasses';
import { AngleRightIcon } from '../angleRight';
export default function HorizontalExpansionIcon(props, {
  attrs
}) {
  return h(AngleRightIcon, Object.assign(Object.assign({}, attrs), {
    class: mergeClasses(attrs.class, ['horizontal-expansion-icon', {
      'is-expanded': props.isExpanded
    }])
  }));
}
//# sourceMappingURL=HorizontalExpansionIcon.js.map