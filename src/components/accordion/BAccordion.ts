import './accordion.sass';
import { VNode } from 'vue';
import { AsyncComponent, Component, PropValidator } from 'vue/types/options';
import { ThemeInjectionMixin } from '../../mixins/themeInjection';
import { getToggleMixin } from '../../mixins/toggle/ToggleMixin';
import { formatTransition, FadeTransitionMixin } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { applyMixins } from '../../utils/applyMixins';
import BAccordionContent from './BAccordionContent';

const VerticalExpansionIcon = () => import('../icons/verticalExpansion/VerticalExpansionIcon');

export default applyMixins(getToggleMixin('isExpanded'), FadeTransitionMixin, ThemeInjectionMixin).extend({
  name: 'BAccordion',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: Function
    } as PropValidator<Component<any, any, any, any> | AsyncComponent<any, any, any, any>>
  },
  methods: {
    generateHeader(): VNode {
      return this.$createElement('header', { staticClass: 'card-header', on: { click: this.toggle } }, [
        this.generateHeaderTitle(),
        this.generateTriggerButton()
      ]);
    },
    generateHeaderTitle(): VNode {
      return this.$createElement(
        'h1',
        { staticClass: 'card-header-title' },
        this.$scopedSlots.title ? this.$scopedSlots.title!(undefined) : [this.title]
      );
    },
    generateTriggerButton(): VNode {
      return this.$createElement(
        'button',
        {
          staticClass: 'card-header-icon',
          on: {
            ...this.keyboardToggler,
            click: this.stopPropagationToggle
          },
          attrs: this.attrs
        },
        [
          this.$createElement(this.icon === undefined ? VerticalExpansionIcon : this.icon, {
            props: { isExpanded: this.internalStatus }
          })
        ]
      );
    },
    generateBody(): VNode {
      return this.$createElement('transition', { attrs: formatTransition(this.transition) }, [
        this.generateBodyContent()
      ]);
    },
    generateBodyContent(): VNode {
      return this.$createElement(
        BAccordionContent,
        {
          directives: [{ name: 'show', value: this.internalStatus }],
          attrs: {
            'aria-hidden': !this.internalStatus
          }
        },
        this.$scopedSlots.default!(undefined)
      );
    },
    stopPropagationToggle(e: MouseEvent) {
      e.stopPropagation();
      this.toggle();
    }
  },
  render(): VNode {
    return this.$createElement('article', { staticClass: 'b-card card', class: this.themeClasses }, [
      this.generateHeader(),
      this.generateBody()
    ]);
  }
});
