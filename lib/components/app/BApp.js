import "../../../src/components/app/app.sass";
import { isSome } from 'fp-ts/lib/Option';
import { defineComponent, shallowRef, h } from 'vue';
import { provideNavigationDrawerController, ProvideNavigationDrawerControllerPropsDefinition } from '../../composables/navigationDrawerController';
import { provideNoticeController } from '../../composables/noticeController';
import { providePopupController } from '../../composables/popupController';
import { provideTheme, ProvideThemePropDefinitions } from '../../composables/theme';
import { formatTransition } from '../../composables/transition';
import { provideWindowSize, ProvideWindowSizePropsDefinition } from '../../composables/windowSize';
import BNavigationDrawer from '../navigationDrawer/BNavigationDrawer';
import BNoticeContainer from '../notices/noticeContainer/BNoticeContainer';
import BPopupContainer from '../popupContainer/BPopupContainer';
const DEFAULT_TRANSITION = {
  name: 'fade'
};

function generateNoticeContainer(ref) {
  return h(BNoticeContainer, {
    ref
  });
}

function generatePopupContainer(ref) {
  return h(BPopupContainer, {
    ref
  });
}

function generateNavigationSlot(slots) {
  return h(BNavigationDrawer, {
    isFullscreen: true,
    slots: {
      default: () => slots['navigation-drawer']()
    }
  });
}

function generateMainContent(slots) {
  return h('div', {
    class: 'b-app-content'
  }, slots.default());
}

export default defineComponent({
  name: 'b-app',
  props: Object.assign(Object.assign(Object.assign({}, ProvideThemePropDefinitions), ProvideWindowSizePropsDefinition), ProvideNavigationDrawerControllerPropsDefinition),

  setup(props, {
    slots
  }) {
    const popup = shallowRef(null);
    const top = shallowRef(null);
    const bottom = shallowRef(null);

    function showNotice(params) {
      const options = Object.assign(Object.assign({}, params), {
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      });
      return params.placement === 'top' ? top.value.showNotice(options) : bottom.value.showNotice(options);
    }

    function showPopup(params) {
      return popup.value.showPopup({
        render: params.render,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      });
    }

    provideTheme(props);
    provideNoticeController(showNotice);
    providePopupController(showPopup);
    provideWindowSize(props);
    const {
      isVisible
    } = provideNavigationDrawerController(props);
    return () => {
      const useNavigationDrawer = isSome(isVisible.value) && isVisible.value.value;
      const nodes = [generateNoticeContainer(top), generateNoticeContainer(bottom), generatePopupContainer(popup), generateMainContent(slots)];

      if (useNavigationDrawer) {
        nodes.push(generateNavigationSlot(slots));
      }

      return h('div', {
        class: ['b-app', {
          'has-navigation-drawer': useNavigationDrawer
        }]
      }, nodes);
    };
  }

});
//# sourceMappingURL=BApp.js.map