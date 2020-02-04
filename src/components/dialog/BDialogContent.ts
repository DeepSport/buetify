import "./dialog.sass";
import { applyMixins } from "../../utils/applyMixins";
import { SizeVariant } from "../../types/SizeVariants";
import Vue, { PropType, VNode } from "vue";
import { getThemeInjectionMixin } from "../../mixins/themeInjection/ThemeInjectionMixin";

const DIALOG_THEME_MAP = {
  dark: "is-grey-dark",
  light: ""
};

const DIALOG_THEME_MIXIN = getThemeInjectionMixin(DIALOG_THEME_MAP);

export default applyMixins(DIALOG_THEME_MIXIN).extend({
  name: "BDialogContent",
  props: {
    cardClass: String,
    size: {
      type: String as PropType<SizeVariant>,
      required: false
    }
  },
  computed: {
    hasFooter(): boolean {
      return !!this.$slots.footer;
    },
    hasHeader(): boolean {
      return !!this.$slots.header;
    }
  },
  methods: {
    generateDialogContentChildren(): VNode[] {
      const children: VNode[] = [];
      if (this.hasHeader) {
        children.push(this.generateHeader());
      }
      children.push(this.generateBody());
      if (this.hasFooter) {
        children.push(this.generateFooter());
      }
      return children;
    },
    generateDialogContent(): VNode {
      return this.$createElement(
        "article",
        {
          staticClass: "modal-card",
          class: [this.cardClass, ...this.themeClasses]
        },
        this.generateDialogContentChildren()
      );
    },
    generateFooter(): VNode {
      return this.$createElement(
        "footer",
        { staticClass: "modal-card-foot" },
        this.$slots.footer
      );
    },
    generateHeader(): VNode {
      return this.$createElement(
        "header",
        { staticClass: "modal-card-head" },
        this.$slots.header
      );
    },
    generateBody(): VNode {
      return this.$createElement(
        "section",
        { staticClass: "modal-card-body" },
        this.$slots.default
      );
    }
  },
  render(): VNode {
    return this.$createElement(
      "div",
      { staticClass: "dialog", class: this.size },
      [this.generateDialogContent()]
    );
  }
});
