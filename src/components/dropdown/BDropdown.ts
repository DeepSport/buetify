import './dropdown.sass';
import { WindowSizeMixin } from '../../mixins/windowSize/WindowSizeMixin';
import { FadeTransitionMixin } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { applyMixins, ExtractVue } from '../../utils/applyMixins';
import { getToggleMixin } from '../../mixins/toggle/ToggleMixin';
import { PropType, VNode, VNodeDirective } from 'vue';
import ClickOutside, { ClickOutsideBindingArgs } from '../../directives/clickOutside';
import { DROPDOWN_THEME_MIXIN } from './shared';

export type DropdownPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';

const base = applyMixins(DROPDOWN_THEME_MIXIN, getToggleMixin('isActive', true), WindowSizeMixin, FadeTransitionMixin);

interface options extends ExtractVue<typeof base> {
  $refs: {
    trigger: Element;
    dropdownMenu: Element;
  };
}

export default base.extend<options>().extend({
  name: 'BDropdown',
  props: {
    id: String,
    isDisabled: Boolean,
    isHoverable: Boolean,
    isInline: Boolean,
    isExpanded: {
      type: Boolean,
      default: false
    },
    position: {
      type: String as PropType<DropdownPosition>,
      validator(value) {
        return ['is-top-right', 'is-top-left', 'is-bottom-left'].includes(value);
      }
    },
    isMobileModal: {
      type: Boolean,
      default: true
    },
    menuTag: {
      type: String,
      default: 'ul'
    }
  },
  directives: {
    ClickOutside
  },
  computed: {
    computedId(): string {
      return this.id || `dropdown-menu-${this._uid}`;
    },
    rootClasses(): any[] {
      return [
        this.position,
        {
          'is-expanded': this.isExpanded,
          'is-disabled': this.isDisabled,
          'is-hoverable': this.isHoverable,
          'is-inline': this.isInline,
          'is-active': this.internalStatus || this.isInline,
          'is-mobile-modal': this.isMobileModal
        }
      ];
    },
    displayMenu(): boolean {
      return (!this.isDisabled && (this.internalStatus || this.isHoverable)) || this.isInline;
    },
    displayMobileBackground(): boolean {
      return this.internalIsMobileModal && this.windowSize.isTouch;
    },
    internalIsMobileModal(): boolean {
      return this.isMobileModal && !this.isInline && !this.isHoverable;
    },
    clickOutsideArgs(): ClickOutsideBindingArgs {
      return {
        closeConditional: this.closeConditional,
        include: this.getDependentElements
      };
    }
  },
  methods: {
    getDependentElements(): HTMLElement[] {
      return Array.from(this.$refs.dropdownMenu.querySelectorAll('*'));
    },
    /**
     * White-listed items to not close when clicked.
     */
    isInWhiteList(el: HTMLElement) {
      if (el === this.$el) return true;
      if (el === this.$refs.dropdownMenu) return true;
      if (el === this.$refs.trigger) return true;
      return this.isInDropdown(el) || this.isInTrigger(el);
    },
    isInDropdown(el: HTMLElement): boolean {
      return this.$refs.dropdownMenu !== undefined && this.getDependentElements().some(child => child === el);
    },
    isInTrigger(el: HTMLElement): boolean {
      return (
        this.$refs.trigger !== undefined &&
        Array.from(this.$refs.trigger.querySelectorAll('*')).some(child => child === el)
      );
    },
    closeConditional(e: Event): boolean {
      const target = e.target as HTMLElement;
      return this.internalStatus && !this.isInWhiteList(target);
    },
    generateTrigger(): VNode {
      return this.$createElement(
        'div',
        {
          ref: 'trigger',
          staticClass: 'dropdown-trigger',
          attrs: {
            role: 'button',
            'aria-owns': this.computedId,
            'aria-haspopup': 'listbox',
            'aria-expanded': `${this.internalStatus}`
          },
          on: {
            click: this.toggle
          }
        },
        this.$slots.trigger
      );
    },
    generateDropdownMenu(): VNode {
      return this.generateTransition([
        this.$createElement(
          'div',
          {
            ref: 'dropdownMenu',
            staticClass: 'dropdown-menu',
            directives: [
              { name: 'show', value: this.internalStatus },
              {
                name: 'click-outside',
                args: this.clickOutsideArgs,
                value: this.setOff
              } as VNodeDirective
            ]
          },
          [this.generateDropdownContent()]
        )
      ]);
    },
    generateDropdownContent(): VNode {
      return this.$createElement(
        this.menuTag,
        {
          staticClass: 'dropdown-content',
          class: this.themeClasses,
          attrs: {
            role: 'menu',
            id: this.computedId,
            'aria-hidden': !this.internalStatus
          }
        },
        this.$scopedSlots.default!({ toggle: this.toggle })
      );
    },
    generateMobileBackground(): VNode {
      return this.generateTransition([
        this.$createElement(
          'div',
          {
            staticClass: 'background',
            attrs: { 'aria-hidden': !this.internalStatus },
            directives: [{ name: 'show', value: this.internalStatus }]
          },
          [this.generateDropdownMenu()]
        )
      ]);
    },
    generateTransition(children: VNode[]): VNode {
      return this.$createElement('transition', { props: this.formattedTransition }, children);
    },
    generateChildren(): VNode[] {
      const children: VNode[] = [];
      if (!this.isInline) {
        children.push(this.generateTrigger());
      }
      if (this.displayMobileBackground) {
        children.push(this.generateMobileBackground());
      } else {
        children.push(this.generateDropdownMenu());
      }
      return children;
    }
  },
  render(): VNode {
    return this.$createElement('div', { staticClass: 'dropdown', class: this.rootClasses }, this.generateChildren());
  }
});
