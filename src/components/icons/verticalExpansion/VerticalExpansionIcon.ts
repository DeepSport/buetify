import "./vertical-expansion-icon.sass";
import Vue, { VNode } from "vue";
import { mergeVNodeClasses } from "../../../utils/mergeVNodeClasses";
import { mergeVNodeStaticClass } from "../../../utils/mergeVNodeStaticClass";
import { AngleDownIcon } from "../angleDown";

export default Vue.extend({
  name: "VerticalExpansionIcon",
  functional: true,
  props: {
    isExpanded: {
      type: Boolean,
      required: true
    }
  },
  render(h, { data, props }): VNode {
    return h(AngleDownIcon, {
      ...data,
      staticClass: mergeVNodeStaticClass(
        "vertical-expansion-icon",
        data.staticClass
      ),
      class: mergeVNodeClasses(data.class, {
        "is-expanded": props.isExpanded
      })
    });
  }
});
