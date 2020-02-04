import { constant } from "fp-ts/lib/function";
import { isSome } from "fp-ts/lib/Option";
import Vue, { PropType, VNode } from "vue";
import { PropValidator } from "vue/types/options";
import { DEFAULT_THEME_COLOR_MAP } from "../mixins/themeInjection/ThemeInjectionMixin";
import { ThemeInjection } from "../types/AppInjection";
import { ThemeColorMap } from "../types/ThemeColorMap";
import { mergeVNodeClasses } from "./mergeVNodeClasses";
import { mergeVNodeStaticClass } from "./mergeVNodeStaticClass";

export function getThemeProps(
  themeMap: ThemeColorMap,
  defaultIsThemeable: boolean = true
) {
  return {
    themeMap: {
      type: Object,
      required: false,
      default: constant(themeMap)
    } as PropValidator<ThemeColorMap>,
    isThemeable: {
      type: Boolean,
      required: false,
      default: defaultIsThemeable
    }
  };
}

export const THEME_INJECTION = {
  theme: {
    default: undefined
  }
};

export const getThemeableFunctionalComponent = (
  cls: string,
  name: string,
  el: string = "div",
  themeMap: ThemeColorMap = DEFAULT_THEME_COLOR_MAP,
  defaultEl: string = el
) =>
  Vue.extend({
    name,
    functional: true,
    props: {
      ...getThemeProps(themeMap),
      ...(el === "unknown"
        ? { tag: { type: String, required: false, default: defaultEl } }
        : {})
    },
    inject: {
      ...THEME_INJECTION
    },
    render(h, { data, props, injections, children }): VNode {
      data.staticClass = mergeVNodeStaticClass(cls, data.staticClass);
      data.class = getThemeClassesFromContext({ data, props, injections });
      // @ts-ignore
      return h(el === "unknown" ? props.tag : el, data, children);
    }
  });

export function getThemeClasses(
  themeMap: ThemeColorMap,
  themeInjection?: ThemeInjection
): string[] {
  if (
    themeInjection &&
    themeInjection.isThemeable &&
    isSome(themeInjection.currentTheme)
  ) {
    const classes = themeMap[themeInjection.currentTheme.value];
    return Array.isArray(classes) ? classes : [classes];
  } else {
    return [];
  }
}

interface ThemeContext {
  props: {
    isThemeable?: boolean;
    themeMap?: ThemeColorMap;
  };
  data: {
    class?: any;
  };
  injections: {
    theme?: ThemeInjection;
  };
}

export function isThemeable(context: ThemeContext): boolean {
  return (
    !!context.props.isThemeable &&
    !!context.props.themeMap &&
    !!context.injections.theme
  );
}

export function getThemeClassesFromContext(context: ThemeContext) {
  if (
    context.props.isThemeable &&
    context.props.themeMap &&
    context.injections.theme
  ) {
    return mergeVNodeClasses(
      context.data.class,
      getThemeClasses(context.props.themeMap, context.injections.theme)
    );
  } else {
    return context.data.class;
  }
}

export const getThemeableFunctionalComponentWithText = (
  cls: string,
  name: string,
  el: string = "div",
  themeMap: ThemeColorMap = DEFAULT_THEME_COLOR_MAP,
  defaultEl: string = el
) =>
  Vue.extend({
    name,
    functional: true,
    props: {
      ...getThemeProps(themeMap),
      text: {
        type: String,
        required: false
      },
      ...(el === "unknown"
        ? { tag: { type: String, required: false, default: defaultEl } }
        : {})
    },
    inject: {
      ...THEME_INJECTION
    },
    render(h, { data, props, injections, children }: any): VNode {
      data.staticClass = mergeVNodeStaticClass(cls, data.staticClass);
      data.class = getThemeClassesFromContext({ data, props, injections });
      // @ts-ignore
      return h(
        el === "unknown" ? props.tag : el,
        data,
        props.text ? [props.text] : children
      );
    }
  });
