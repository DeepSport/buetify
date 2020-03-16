import './app-header.sass';
import { isEnterEvent } from '../../utils/eventHelpers';
import { VNode } from 'vue';
import { applyMixins } from '../../utils/applyMixins';
import { NavigationInjectionMixin } from '../../mixins/navigationInjection/NavigationInjectionMixin';

export default applyMixins(NavigationInjectionMixin).extend({
  name: 'BAppHeader',
  props: {
    navigationIcon: {
      type: Function,
      required: true

    }
  },
  methods: {
    generateMainSlot(): VNode {
      return this.$createElement('div', { staticClass: 'main-slot' }, this.$slots.default);
    },
    onKeydown(e: KeyboardEvent): void {
      e.preventDefault();
      if (isEnterEvent(e)) {
        this.showNavigationDrawer();
      }
    },
    generateNavigationButton(): VNode {
      return this.$createElement(
        'button',
        {
          staticClass: 'navigation-icon',
          on: {
            keydown: this.onKeydown
          },
          attrs: {
            'aria-label': 'Toggle navigation pane',
            'aria-haspopup': true
          }
        },
        [this.$createElement(this.navigationIcon)]
      );
    }
  },
  render(): VNode {
    return this.navigationDrawerIsVisible
      ? this.$createElement(
          'header',
          {
            staticClass: 'b-app-header is-flex flex-direction-row justify-content-center align-items-center'
          },
          [this.generateMainSlot()]
        )
      : this.$createElement(
          'header',
          {
            on: {
              click: this.showNavigationDrawer
            },
            staticClass: 'b-app-header is-flex flex-direction-row justify-content-center align-items-center'
          },
          [this.generateNavigationButton(), this.generateMainSlot()]
        );
  }
});
