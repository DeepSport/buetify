import './dialog.sass';
import { applyMixins } from '../../utils/applyMixins';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType, VNode } from 'vue';
import { getThemeInjectionMixin } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { DialogTheme } from './theme';

const DIALOG_THEME_MIXIN = getThemeInjectionMixin(DialogTheme);

export default applyMixins(DIALOG_THEME_MIXIN).extend({
  name: 'BDialogContent',
  props: {
    cardClass: String,
    size: {
      type: String as PropType<SizeVariant>,
      required: false
    }
  },
  computed: {
    hasFooter(): boolean {
      return !!this.$scopedSlots.footer;
    },
    hasHeader(): boolean {
      return !!this.$scopedSlots.header;
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
        'article',
        {
          staticClass: 'modal-card',
          class: [this.cardClass, ...this.themeClasses]
        },
        this.generateDialogContentChildren()
      );
    },
    generateFooter(): VNode {
      return this.$createElement('footer', { staticClass: 'modal-card-foot' }, this.$scopedSlots.footer!(undefined));
    },
    generateHeader(): VNode {
      return this.$createElement('header', { staticClass: 'modal-card-head' }, this.$scopedSlots.header!(undefined));
    },
    generateBody(): VNode {
      return this.$createElement('section', { staticClass: 'modal-card-body' }, this.$scopedSlots.default!(undefined));
    }
  },
  render(): VNode {
    return this.$createElement('div', { staticClass: 'b-dialog', class: this.size }, [this.generateDialogContent()]);
  }
});
