import Vue, { VNode } from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BIcon } from "../../icon";
import { mergeVNodeAttrs } from "../../../utils/mergeVNodeAttrs";

export function getIconComponent(name: string, iconDefinition: IconDefinition) {
  const icon = getFontAwesomeIconComponent(iconDefinition);
  return Vue.extend({
    name,
    functional: true,
    render(h, { data }): VNode {
      data.attrs = mergeVNodeAttrs(data.attrs, {
        icon
      });
      return h(BIcon, data);
    }
  });
}

export function getFontAwesomeIconComponent(icon: IconDefinition) {
  return Vue.extend({
    functional: true,
    render(h, data): VNode {
      return h(FontAwesomeIcon, { ...data, props: { icon } });
    }
  });
}
