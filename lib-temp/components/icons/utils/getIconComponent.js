import { h } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BIcon } from '../../icon';
export function getIconComponent(name, iconDefinition) {
    const icon = getFontAwesomeIconComponent(iconDefinition);
    return (_, { attrs }) => h(BIcon, { ...attrs, icon });
}
export function getFontAwesomeIconComponent(icon) {
    return (_, { attrs }) => h(FontAwesomeIcon, { ...attrs, icon });
}
//# sourceMappingURL=getIconComponent.js.map