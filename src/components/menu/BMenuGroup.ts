import './menu.sass';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import { applyMixins } from '../../utils/applyMixins';
import { getToggleMixin } from '../../mixins/toggle/ToggleMixin';
import VerticalExpandTransition from '../../transitions/verticalExpandTransition';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BMenuList from './BMenuList';
import { VNode, defineComponent } from 'vue';

export const BMenuGroup = defineComponent({
  name: 'b-menu-group',
  props: {
    ...getUseTogglePropsDefinition('isExpanded'),
    menuLabelClass: {
      type: String,
      required: false
    },
    menuListClass: {
      type: String,
      required: false
    }
  },
  setup(props, { slots }) {
    const toggle = useToggle(props, 'isExpanded');
    
  }
})

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
        props: { isExpanded: this.internalStatus }
      });
    },
    generateMenuList(): VNode {
      return this.$createElement(VerticalExpandTransition, [
        this.$createElement(
          BMenuList,
          {
            class: this.menuListClass,
            directives: [{ name: 'show', value: this.internalStatus }],
            attrs: { 'aria-hidden': !this.internalStatus }
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
