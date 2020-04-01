import './app.sass';
import { getItem, setItem } from 'fp-ts-local-storage';
import { constant, constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { getOrElse, isSome, none, Option, some } from 'fp-ts/lib/Option';
import { VNode } from 'vue';
import { WindowSizeMixin } from '../../mixins/windowSize';
import { ToggleMixin } from '../../mixins/toggle/ToggleMixin';
import { formatTransition } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { BREAK_POINTS } from '../../mixins/windowSize/WindowSizeMixin';
import {
  AppInjection,
  ModalInjection,
  NavigationInjection,
  NoticeInjection,
  ShowModalOptions,
  ShowNoticeOptions,
  ThemeInjection
} from '../../types/AppInjection';
import { NoticePlacement } from '../../types/NoticePlacement';
import { Theme } from '../../types/Theme';
import { TransitionClasses } from '../../types/Transition';
import { applyMixins } from '../../utils/applyMixins';
import { RenderVNode } from '../../utils/RenderVNode';
import BNavigationDrawer from '../navigationDrawer/BNavigationDrawer';

let theme = getOrElse<Theme>(constant<Theme>('dark'))(getItem('theme')() as Option<Theme>);

const DEFAULT_TRANSITION: TransitionClasses = { name: 'fade' };

export default applyMixins(ToggleMixin, WindowSizeMixin).extend({
  name: 'BApp',
  inheritAttrs: false,
  components: {
    RenderVNode
  },
  props: {
    initialStatus: {
      type: Boolean,
      required: false,
      default: window.innerWidth > BREAK_POINTS.desktop
    },
    isThemeable: {
      type: Boolean,
      required: false,
      default: true
    },
    storeTheme: {
      type: Boolean,
      default: true
    }
  },
  data(): Data {
    return {
      theme,
      top: {
        transition: DEFAULT_TRANSITION,
        node: none
      },
      bottom: {
        transition: DEFAULT_TRANSITION,
        node: none
      },
      overlay: {
        transition: DEFAULT_TRANSITION,
        node: none
      }
    };
  },
  computed: {
    modalInjection(): ModalInjection {
      return {
        showModal: this.showModal
      };
    },
    noticeInjection(): NoticeInjection {
      return {
        showNotice: this.showNotice
      };
    },
    themeInjection(): ThemeInjection {
      const themeInjection = {
        setTheme: this.setTheme
      };
      Object.defineProperty(themeInjection, 'currentTheme', {
        get: () => some(this.theme)
      });
      Object.defineProperty(themeInjection, 'isThemeable', {
        get: () => this.isThemeable
      });
      return themeInjection as any;
    },
    navigationInjection(): NavigationInjection {
      const navigationInjection = {
        showNavigationDrawer: this.setOn,
        hideNavigationDrawer: this.setOff,
        toggleNavigationDrawer: this.toggle
      };
      Object.defineProperty(navigationInjection, 'navigationDrawerIsVisible', {
        get: () => this.isActive
      });
      return navigationInjection as any;
    },
    hasNavigationDrawer(): boolean {
      return (
        !!this.$scopedSlots['navigation-drawer'] && this.$scopedSlots['navigation-drawer'](undefined) !== undefined
      );
    }
  },
  provide(): AppInjection {
    const appInjection = {
      theme: this.themeInjection,
      notice: this.noticeInjection,
      modal: this.modalInjection,
      navigation: this.navigationInjection
    };
    Object.defineProperty(appInjection, 'windowSize', {
      get: () => this.windowSize
    });
    return appInjection as any;
  },
  methods: {
    generateOverlayContainer(): VNode {
      return this.generatePopupContainer(this.overlay);
    },
    generateTopNoticeContainer(): VNode {
      return this.generatePopupContainer(this.top, 'notices-is-top', 2);
    },
    generateBottomNoticeContainer(): VNode {
      return this.generatePopupContainer(this.bottom, 'notices-is-bottom', 2);
    },
    generatePopupContainer(popup: Popup, staticClass?: string, zIndex: number = 1): VNode {
      return this.$createElement('div', { staticClass, style: { zIndex: isSome(popup.node) ? zIndex : -1 } }, [
        this.$createElement('transition', { attrs: popup.transition }, this.generateRenderNode(popup.node))
      ]);
    },
    generateRenderNode(node: Option<VNode>): VNode[] {
      return isSome(node) ? [this.$createElement(RenderVNode, { props: { node: node.value } })] : [];
    },
    setTheme(theme: Theme): void {
      this.theme = theme;
      if (this.storeTheme) {
        this.persistTheme(theme);
      }
    },
    persistTheme(newTheme: Theme): void {
      theme = newTheme;
      setItem('theme', newTheme)();
    },
    shouldQueueNotice(placement: NoticePlacement): boolean {
      return placement === 'top' ? isSome(this.top.node) : isSome(this.bottom.node);
    },
    showModal({ node, transition = DEFAULT_TRANSITION }: ShowModalOptions): IO<void> {
      this.overlay = {
        transition: formatTransition(transition),
        node: some(node)
      };
      return () => (this.overlay.node = none);
    },
    removeTopNotice() {
      this.$nextTick(() => (this.top.node = none));
    },
    removeBottomNotice() {
      this.$nextTick(() => (this.bottom.node = none));
    },
    generateNavigationSlot() {
      return this.$createElement(BNavigationDrawer, {
        props: { isFullheight: true },
        scopedSlots: {
          default: () => this.$scopedSlots['navigation-drawer']!(undefined)
        }
      });
    },
    showNotice(params: ShowNoticeOptions): IO<void> {
      if (params.shouldQueue && this.shouldQueueNotice(params.placement)) {
        setTimeout(() => this.showNotice(params), 250);
        return constVoid;
      }
      if (params.placement === 'top') {
        this.top = {
          transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION,
          node: some(params.node)
        };
        if (params.duration === 0) {
          return this.removeTopNotice;
        } else {
          setTimeout(this.removeTopNotice, params.duration);
          return constVoid;
        }
      } else {
        this.bottom = {
          transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION,
          node: some(params.node)
        };
        if (params.duration === 0) {
          return this.removeBottomNotice;
        } else {
          setTimeout(this.removeBottomNotice, params.duration);
          return constVoid;
        }
      }
    },
    generateMainContent(): VNode {
      return this.$createElement('div', { staticClass: 'b-app-content' }, this.$scopedSlots.default!(undefined));
    }
  },
  render(): VNode {
    const nodes = [
      this.generateTopNoticeContainer(),
      this.generateBottomNoticeContainer(),
      this.generateOverlayContainer(),
      this.generateMainContent()
    ];
    if (this.hasNavigationDrawer) {
      nodes.push(this.generateNavigationSlot());
    }
    return this.$createElement(
      'div',
      { staticClass: 'b-app', class: { 'has-navigation-drawer': this.hasNavigationDrawer } },
      nodes
    );
  }
});

interface Popup {
  transition: TransitionClasses;
  node: Option<VNode>;
}

interface Data {
  top: Popup;
  bottom: Popup;
  overlay: Popup;
  theme: Theme;
}
