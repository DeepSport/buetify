import './menu.sass';
import { applyMixins } from '../../utils/applyMixins';
import { getToggleMixin } from '../../mixins/toggle/ToggleMixin';
import VerticalExpandTransition from '../../transitions/verticalExpandTransition';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BMenuList from './BMenuList';
import { VNode } from 'vue';

export default applyMixins(getToggleMixin('isExpanded')).extend({
  name: 'BMenuGroup',
  components: {
    VerticalExpansionIcon,
    BMenuList
  },
  props: {
    menuLabelClass: {
      type: String,
      required: false
    },
    menuListClass: {
      type: String,
      required: false
    }
  },
  methods: {
    generateTrigger(): VNode {
      return this.$createElement(
        'button',
        {
          staticClass: 'is-flex flex-direction-row justify-content-space-between align-items-center is-fullwidth',
          on: this.listeners,
          attrs: this.attrs,
          class: this.menuLabelClass
        },
        [this.$slots['menu-label'], this.generateTriggerButton()]
      );
    },
    generateTriggerButton(): VNode {
      return this.$createElement(VerticalExpansionIcon, {
        props: { isExpanded: this.internalIsOn }
      });
    },
    generateMenuList(): VNode {
      return this.$createElement(VerticalExpandTransition, [
        this.$createElement(
          BMenuList,
          {
            class: this.menuListClass,
            directives: [{ name: 'show', value: this.isActive }],
            attrs: { 'aria-hidden': !this.isActive }
          },
          this.$slots.default
        )
      ]);
    }
  },
  render(): VNode {
    return this.$createElement('section', [this.generateTrigger(), this.generateMenuList()]);
  }
});
