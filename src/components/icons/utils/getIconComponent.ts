import { h, SetupContext } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BIcon } from '../../icon';

export function getIconComponent(name: string, iconDefinition: IconDefinition) {
  const icon = getFontAwesomeIconComponent(iconDefinition);
  return (_: any, { attrs }: SetupContext) => h(BIcon, { ...attrs, icon })
}

export function getFontAwesomeIconComponent(icon: IconDefinition) {
  return (_: any, { attrs }: SetupContext) => h(FontAwesomeIcon, {...attrs, icon })
}
