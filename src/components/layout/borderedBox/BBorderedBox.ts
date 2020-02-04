import "./bordered-box.sass";
import { ColorVariant } from "../../../types/ColorVariants";
import {
  getThemeClasses,
  getThemeClassesFromContext,
  getThemeProps,
  THEME_INJECTION
} from "../../../utils/getThemeableFunctionalComponent";
import { mergeVNodeStaticClass } from "../../../utils/mergeVNodeStaticClass";
import Vue, { PropType, VNode } from "vue";

const BORDERED_BOX_THEME_MAP = {
  dark: "is-orange",
  light: "is-link"
};

export default Vue.extend({
  name: "BBorderedBox",
  functional: true,
  props: {
    variant: {
      type: String as PropType<ColorVariant>,
      default: "is-primary"
    },
    tag: {
      type: String,
      default: "div"
    },
    ...getThemeProps(BORDERED_BOX_THEME_MAP)
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass(
      "b-bordered-box",
      data.staticClass
    );
    data.class = getThemeClassesFromContext({ data, props, injections });
    return h(props.tag, data, children);
  }
});
