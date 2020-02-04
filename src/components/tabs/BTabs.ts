import "./tabs.sass";
import { head, lookup } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import BTabItem, { BTabItemName, BTabItemPropsData } from "./BTabItem";
import { getProxyableMixin, ProxyableMixin } from "../../mixins/proxyable/ProxyableMixin";
import { VNode, VNodeComponentOptions } from "vue";
import { PropValidator } from "vue/types/options";
import { applyMixins } from "../../utils/applyMixins";
import { getThemeInjectionMixin } from "../../mixins/themeInjection/ThemeInjectionMixin";
import { map, mapNullable, none, Option, some } from "fp-ts/lib/Option";

const TABS_THEME_MAP = {
  dark: "is-orange",
  light: ""
};

const TABS_THEME_MIXIN = getThemeInjectionMixin(TABS_THEME_MAP);

interface TabInjection {
  activeLabel: Option<string>;
  destroyOnHide: boolean;
}

export type TabPosition = "is-centered" | "is-right";

export type TabType = "is-boxed" | "is-toggle" | "is-toggle-rounded";

export type TabSize = "is-small" | "is-medium" | "is-large";

interface Data {
  injection: TabInjection;
  transition: "slide-next" | "slide-prev";
}

export default applyMixins(
  TABS_THEME_MIXIN,
  getProxyableMixin("value", "input", 0)
).extend({
  name: "BTabs",
  props: {
    isExpanded: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: undefined
    } as PropValidator<TabType | undefined>,
    size: {
      type: String,
      default: undefined
    } as PropValidator<TabSize | undefined>,
    position: {
      type: String,
      default: undefined
    } as PropValidator<TabPosition | undefined>,
    label: String,
    isAnimated: {
      type: Boolean,
      default: true
    },
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },
  data(): Data {
    return {
      transition: "slide-next",
      injection: {
        activeLabel: none,
        destroyOnHide: this.destroyOnHide
      }
    };
  },
  provide(): Record<"tab", TabInjection> {
    return {
      tab: this.injection
    };
  },
  computed: {
    rootClasses(): object {
      return {
        "is-fullwidth": this.isExpanded
      };
    },
    navClasses(): any {
      return [
        ...this.themeClasses,
        this.type,
        this.size,
        this.position,
        {
          "is-fullwidth": this.isExpanded,
          "is-toggle-rounded is-toggle": this.type === "is-toggle-rounded"
        }
      ];
    }
  },
  watch: {
    destroyOnHide(newVal: boolean) {
      if (newVal !== this.injection.destroyOnHide) {
        this.injection.destroyOnHide = newVal;
      }
    },
    internalValue(newVal: number, oldVal: number) {
      if (newVal !== oldVal) {
        const nodes = this.parseNodes();
        this.injection.activeLabel = pipe(
          lookup(newVal, nodes),
          map(node => node.componentOptions.propsData.label)
        );
      }
    }
  },
  beforeMount(): void {
    const nodes = this.parseNodes();
    const index = nodes.findIndex(
      node =>
        ((node.componentOptions.propsData.isDisabled === undefined ||
          node.componentOptions.propsData.isDisabled === false) &&
          node.componentOptions.propsData.isVisible === undefined) ||
        node.componentOptions.propsData.isVisible === true
    );
    if (index > -1) {
      this.injection.activeLabel = some(
        nodes[index].componentOptions.propsData.label
      );
      this.internalValue = index;
    }
  },
  methods: {
    getOnTabClick(index: number, label: string) {
      return () => {
        if (this.internalValue !== index) {
          this.transition =
            index < (this.internalValue as number)
              ? "slide-next"
              : "slide-prev";
          this.$nextTick(() => {
            this.injection.activeLabel = some(label);
            this.internalValue = index;
          });
        }
      };
    },
    generateNavHeader(tabs: BTabItemNode[]): VNode {
      return this.$createElement(
        "nav",
        { staticClass: "tabs", class: this.navClasses },
        this.label
          ? [this.generateNavLabel(this.label), this.generateNavItems(tabs)]
          : [this.generateNavItems(tabs)]
      );
    },
    generateNavLabel(label: string): VNode {
      return this.$createElement(
        "label",
        {
          staticClass: "label is-marginless align-self-center",
          class: this.size
        },
        label
      );
    },
    generateNavItems(tabs: BTabItemNode[]): VNode {
      return this.$createElement("ul", tabs.map(this.generateNavItem));
    },
    generateNavItem(tab: BTabItemNode, index: number): VNode {
      const propsData = tab.componentOptions.propsData;
      const label = propsData.label;
      return this.$createElement(
        "li",
        {
          key: label,
          directives: [
            {
              name: "show",
              value:
                propsData.isVisible === undefined ? true : propsData.isVisible
            }
          ],
          class: {
            "is-active": this.internalValue === index,
            "is-disabled": propsData.isDisabled
          }
        },
        [
          this.$createElement(
            "a",
            { on: { click: this.getOnTabClick(index, label) } },
            propsData.icon
              ? [
                  this.$createElement(propsData.icon, {
                    props: { size: this.size }
                  }),
                  label
                ]
              : label
          )
        ]
      );
    },
    generateTabContent(tabs: BTabItemNode[]): VNode {
      return this.$createElement(
        "section",
        { staticClass: "tab-content", attrs: { "aria-label": "Tab Content" } },
        [
          this.$createElement(
            "transition",
            { props: { name: this.transition } },
            [tabs[this.internalValue as number]]
          )
        ]
      );
    },
    parseNodes(): BTabItemNode[] {
      return (this.$slots.default || []).filter(isTab);
    }
  },
  render(): VNode {
    const tabs = this.parseNodes();
    return this.$createElement(
      "article",
      { staticClass: "b-tabs", class: this.rootClasses },
      [this.generateNavHeader(tabs), this.generateTabContent(tabs)]
    );
  }
});

type BTabItemNode = VNode & {
  componentOptions: VNodeComponentOptions & {
    CTor: typeof BTabItem;
    propsData: BTabItemPropsData;
  };
};

function isTab(node: VNode): node is BTabItemNode {
  return (
    !!node.componentOptions &&
    node.componentOptions.Ctor.options.name === BTabItemName
  );
}
