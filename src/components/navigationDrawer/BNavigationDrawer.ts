import './navigation-drawer.sass';
import { WindowSize, WindowSizeMixin } from '../../mixins/windowSize/WindowSizeMixin';
import { SlideRightTransition } from '../../transitions/slideRightTransition';
import { VNode } from 'vue';
import BOverlay from '../overlay/BOverlay';
import { NavigationInjectionMixin } from '../../mixins/navigationInjection/NavigationInjectionMixin';
import { getThemeInjectionMixin } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { applyMixins } from '../../utils/applyMixins';
import { NavigationDrawerTheme } from './theme';

export default applyMixins(
  NavigationInjectionMixin,
  WindowSizeMixin,
  getThemeInjectionMixin(NavigationDrawerTheme)
).extend({
  name: 'BNavigationDrawer',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'nav'
    },
    isFullheight: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    displayMobileDrawer(): boolean {
      return this.windowSize.isTouch || this.windowSize.isDesktop;
    },
    classes(): any {
      return [{ 'is-fullheight': this.isFullheight }, ...this.themeClasses];
    }
  },
  watch: {
    windowSize(newValue: WindowSize) {
      if (newValue.isTouch || newValue.isDesktop) {
        this.hideNavigationDrawer();
      } else {
        this.showNavigationDrawer();
      }
    },
    $route() {
      if (this.windowSize.isTouch || this.windowSize.isDesktop) {
        this.hideNavigationDrawer();
      }
    }
  },
  methods: {
    generateMobileDrawer(): VNode {
      return this.$createElement(SlideRightTransition, [
        this.$createElement(
          BOverlay,
          {
            staticClass: 'is-left',
            props: { isActive: this.navigationDrawerIsVisible },
            on: { close: this.hideNavigationDrawer.bind(this) }
          },
          [this.generateDrawer()]
        )
      ]);
    },
    generateDrawer(): VNode {
      return this.$createElement(
        this.tag,
        {
          staticClass: 'b-navigation-drawer',
          class: this.classes
        },
        this.$scopedSlots.default!({
          showNavigationDrawer: this.showNavigationDrawer,
          hideNavigationDrawer: this.hideNavigationDrawer,
          navigationDrawerIsVisible: this.navigationDrawerIsVisible,
          toggleNavigationDrawer: this.toggleNavigationDrawer
        })
      );
    }
  },
  render(): VNode {
    if (this.displayMobileDrawer) {
      return this.generateMobileDrawer();
    } else {
      return this.generateDrawer();
    }
  }
});
