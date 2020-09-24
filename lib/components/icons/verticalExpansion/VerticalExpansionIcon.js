import "../../../../src/components/icons/verticalExpansion/vertical-expansion-icon.sass";
import { h } from 'vue';
import { mergeClasses } from '../../../utils/mergeClasses';
import { AngleDownIcon } from '../angleDown';
export default function VerticalExpansionIcon(props, {
  attrs
}) {
  return h(AngleDownIcon, Object.assign(Object.assign({}, attrs), {
    class: mergeClasses(attrs.class, ['vertical-expansion-icon', {
      'is-expanded': props.isExpanded
    }])
  }));
}
//# sourceMappingURL=VerticalExpansionIcon.js.map