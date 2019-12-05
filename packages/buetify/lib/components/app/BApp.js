import "../../../src/sass/helpers/animations.sass";
import "../../../src/components/app/app.sass";
import { defineComponent, shallowRef, h, vShow, withDirectives } from 'vue';
import { provideNoticeController } from '../../composables/noticeController';
import { providePopupController } from '../../composables/popupController';
import { provideTheme, ProvideThemePropDefinitions } from '../../composables/theme';
import { formatTransition } from '../../composables/transition';
import { provideWindowSize, ProvideWindowSizePropsDefinition } from '../../composables/windowSize';
import BSidebar from '../sidebar/BSidebar';
import BNoticeContainer from '../notices/noticeContainer/BNoticeContainer';
import BPopupContainer from '../popupContainer/BPopupContainer';
import { provideSidebarController, ProvideSidebarControllerPropsDefinition } from '../sidebar/composables';
const DEFAULT_TRANSITION = {
  name: 'fade'
};

function generateNoticeContainer(placement, ref) {
  return h(BNoticeContainer, {
    ref,
    class: placement === 'top' ? 'notices-is-top' : 'notices-is-bottom'
  });
}

function generatePopupContainer(ref) {
  return h(BPopupContainer, {
    ref
  });
}

function generateSidebarSlot(slots, hasHeader, currentRoute, sidebar) {
  return h(BSidebar, {
    currentRoute,
    isFullheight: true
  }, () => slots.sidebar && slots.sidebar(sidebar));
}

function generateBodyContent(slots, hasNavigationDrawer, sidebar, currentRoute) {
  const nodes = [];

  if (slots.header) {
    const header = slots.header(sidebar);
    if (header) nodes.push(header);
  }

  nodes.push(h('div', {
    class: 'b-app-body-content'
  }, hasNavigationDrawer ? [withDirectives(generateSidebarSlot(slots, !!slots.header, currentRoute, sidebar), [[vShow, sidebar.isVisible.value]]), h('div', {
    class: 'b-app-content'
  }, slots.default(sidebar))] : [h('div', {
    class: 'b-app-content'
  }, slots.default(sidebar))]));
  return nodes;
}

export default defineComponent({
  name: 'b-app',
  props: { ...ProvideThemePropDefinitions,
    ...ProvideWindowSizePropsDefinition,
    ...ProvideSidebarControllerPropsDefinition
  },

  setup(props, {
    slots
  }) {
    const popup = shallowRef(null);
    const top = shallowRef(null);
    const bottom = shallowRef(null);

    function showNotice(params) {
      const options = { ...params,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      };
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
    const sidebarController = provideSidebarController(props);
    return () => {
      const hasNavigationDrawer = !!slots['sidebar'];
      const nodes = [generateNoticeContainer('top', top), generateNoticeContainer('bottom', bottom), generatePopupContainer(popup)];
      nodes.push(h('div', {
        class: ['b-app', {
          'has-navigation-drawer': hasNavigationDrawer && sidebarController.isVisible.value,
          'has-header': !!slots.header
        }]
      }, generateBodyContent(slots, hasNavigationDrawer, sidebarController, props.currentRoute)));
      return h('div', nodes);
    };
  }

});
//# sourceMappingURL=BApp.js.map