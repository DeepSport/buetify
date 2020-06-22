import './vertical-expansion-icon.sass';
import { SetupContext, h } from 'vue';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';
import { AngleDownIcon } from '../angleDown';

export default function VerticalExpansionIcon(props: { isExpanded: boolean }, { attrs }: SetupContext) {
  return h(AngleDownIcon, {
    ...attrs,
    class: mergeClasses(attrs.class as Classes, ['vertical-expansion-icon', { 'is-expanded': props.isExpanded }])
  });
}
