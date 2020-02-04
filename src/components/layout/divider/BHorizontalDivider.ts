import "./divider.sass";
import {
  getThemeClassesFromContext,
  getThemeProps,
  THEME_INJECTION
} from "../../../utils/getThemeableFunctionalComponent";
import { mergeVNodeStaticClass } from "../../../utils/mergeVNodeStaticClass";
import { DEFAULT_THEME_COLOR_MAP } from "../../../mixins/themeInjection/ThemeInjectionMixin";
import Vue, { VNode } from "vue";
export default Vue.extend({
  name: "BHorizontalDivider",
  functional: true,
  props: {
    text: {
      type: String,
      required: false,
      default: ""
    },
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    ...getThemeProps(DEFAULT_THEME_COLOR_MAP)
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { props, data, injections }): VNode {
    data.staticClass = mergeVNodeStaticClass("is-divider", data.staticClass);
    data.class = getThemeClassesFromContext({ data, props, injections });
    if (props.text) {
      data.domProps = { "data-content": props.text };
    }
    return h(props.tag, data);
  }
});
