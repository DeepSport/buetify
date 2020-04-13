import './app.sass';
import { getItem, setItem } from 'fp-ts-local-storage';
import { constant } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { getOrElse, Option, some } from 'fp-ts/lib/Option';
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
import { Theme } from '../../types/Theme';
import { TransitionClasses } from '../../types/Transition';
import { applyMixins, ExtractVue } from '../../utils/applyMixins';
import BNavigationDrawer from '../navigationDrawer/BNavigationDrawer';
import BNoticeContainer, { NoticeOptions } from '../notices/noticeContainer/BNoticeContainer';
import BPopupContainer from '../popupContainer/BPopupContainer';

let theme = getOrElse<Theme>(constant<Theme>('dark'))(getItem('theme')() as Option<Theme>);

const DEFAULT_TRANSITION: TransitionClasses = { name: 'fade' };

const base = applyMixins(ToggleMixin, WindowSizeMixin);

type PopupContainer = ExtractVue<typeof BPopupContainer>;
type NoticeContainer = ExtractVue<typeof BNoticeContainer>;

export interface options extends ExtractVue<typeof base> {
  $refs: {
    overlay: PopupContainer;
    top: NoticeContainer;
    bottom: NoticeContainer;
  };
}

export default base.extend<options>().extend({
  name: 'BApp',
  inheritAttrs: false,
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
      theme
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
        get: () => this.internalStatus
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
      return this.$createElement(BPopupContainer, { ref: 'overlay' });
    },
    generateTopNoticeContainer(): VNode {
      return this.$createElement(BNoticeContainer, { ref: 'top', staticClass: 'notices-is-top' });
    },
    generateBottomNoticeContainer(): VNode {
      return this.$createElement(BNoticeContainer, { ref: 'bottom', staticClass: 'notices-is-bottom' });
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
    showModal({ render, transition = DEFAULT_TRANSITION }: ShowModalOptions): IO<void> {
      return this.$refs.overlay.showPopup({ render, transition: formatTransition(transition) });
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
      const options: NoticeOptions = {
        ...params,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      };
      return params.placement === 'top' ? this.$refs.top.showNotice(options) : this.$refs.bottom.showNotice(options);
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

interface Data {
  theme: Theme;
}
