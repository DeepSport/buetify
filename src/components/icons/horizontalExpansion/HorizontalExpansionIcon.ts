import './horizontal-expansion-icon.sass';
import { h, SetupContext } from 'vue';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';
import { AngleRightIcon } from '../angleRight';

export default function HorizontalExpansionIcon(props: { isExpanded: boolean }, { attrs }: SetupContext) {
	return h(AngleRightIcon, {
		...attrs,
		class: mergeClasses(attrs.class as Classes, ['horizontal-expansion-icon', { 'is-expanded': props.isExpanded }])
	});
}
