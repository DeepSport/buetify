import './accordion.sass';
import { VNode } from 'vue';
import { AsyncComponent, Component, PropValidator } from 'vue/types/options';
import { ThemeInjectionMixin } from '../../mixins/themeInjection';
import { ToggleMixin } from '../../mixins/toggle/ToggleMixin';
import { formatTransition, FadeTransitionMixin } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { applyMixins } from '../../utils/applyMixins';

export default applyMixins(ToggleMixin, FadeTransitionMixin, ThemeInjectionMixin).extend({
  name: 'BAccordion',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: Function,
      default: () => import('../icons/verticalExpansion/VerticalExpansionIcon')
    } as PropValidator<Component<any, any, any, any> | AsyncComponent<any, any, any, any>>
  },
  computed: {
    header(): VNode {
      return this.$createElement('header', { staticClass: 'card-header' }, [this.headerTitle, this.triggerButton]);
    },
    headerTitle(): VNode {
      return this.$createElement(
        'h1',
        { staticClass: 'card-header-title' },
        this.$slots.title ? this.$slots.title : [this.title]
      );
    },
    triggerButton(): VNode {
      return this.$createElement(
        'button',
        {
          staticClass: 'card-header-icon',
          on: this.listeners,
          attrs: this.attrs
        },
        [
          this.$createElement(this.icon, {
            props: { isExpanded: this.isActive }
          })
        ]
      );
    },
    body(): VNode {
      return this.$createElement('transition', { attrs: formatTransition(this.transition) }, [this.bodyContent]);
    },
    bodyContent(): VNode {
      return this.$createElement(
        'section',
        {
          directives: [{ name: 'show', value: this.isActive }],
          attrs: {
            'aria-hidden': this.isActive
          },
          staticClass: 'card-content'
        },
        this.$slots.default
      );
    }
  },
  render(): VNode {
    return this.$createElement('article', { staticClass: 'b-card card', class: this.themeClasses }, [
      this.header,
      this.body
    ]);
  }
});
