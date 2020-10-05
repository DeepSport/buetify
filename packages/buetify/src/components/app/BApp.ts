import './app.sass';
import { defineComponent, shallowRef, h, Slots, Ref, vShow, withDirectives, VNode } from 'vue';
import {
  composables,
  ProvideSidebarControllerPropsDefinition,
  SidebarController
} from '../../composables/navigationDrawerController';
import { provideNoticeController, ShowNoticeOptions } from '../../composables/noticeController';
import { providePopupController, ShowPopupOptions } from '../../composables/popupController';
import { provideTheme, ProvideThemePropDefinitions } from '../../composables/theme';
import { formatTransition } from '../../composables/transition';
import { provideWindowSize, ProvideWindowSizePropsDefinition } from '../../composables/windowSize';
import { TransitionClasses } from '../../types/Transition';
import BSidebar from '../sidebar/BSidebar';
import BNoticeContainer, { NoticeContainer, NoticeOptions } from '../notices/noticeContainer/BNoticeContainer';
import BPopupContainer, { PopupContainer } from '../popupContainer/BPopupContainer';

const DEFAULT_TRANSITION: TransitionClasses = { name: 'fade' };

function generateNoticeContainer(placement: 'top' | 'bottom', ref: Ref<NoticeContainer>) {
  return h(BNoticeContainer, { ref, class: placement === 'top' ? 'notices-is-top' : 'notices-is-bottom' });
}

function generatePopupContainer(ref: Ref<PopupContainer>) {
  return h(BPopupContainer, { ref });
}

function generateSidebarSlot(
  slots: Slots,
  hasHeader: boolean,
  currentRoute: Record<string, unknown> | undefined,
  sidebar: SidebarController
) {
  return h(
    BSidebar,
    {
      currentRoute,
      isFullheight: true,
      class: {
        'is-absolute': hasHeader
      }
    },
    () => slots.sidebar && slots.sidebar(sidebar)
  );
}

function generateBodyContent(
  slots: Slots,
  hasNavigationDrawer: boolean,
  sidebar: SidebarController,
  currentRoute: Record<string, unknown> | undefined
) {
  const nodes: Array<VNode | VNode[]> = [];
  if (slots.header) {
    const header = slots.header(sidebar);
    if (header) nodes.push(header);
  }
  nodes.push(
    h(
      'div',
      { class: 'b-app-body-content' },
      hasNavigationDrawer
        ? [
            withDirectives(generateSidebarSlot(slots, !!slots.header, currentRoute, sidebar), [
              [vShow, sidebar.isVisible.value]
            ]),
            h('div', { class: 'b-app-content' }, slots.default!(sidebar))
          ]
        : [h('div', { class: 'b-app-content' }, slots.default!(sidebar))]
    )
  );
  return nodes;
}

export default defineComponent({
  name: 'b-app',
  props: {
    ...ProvideThemePropDefinitions,
    ...ProvideWindowSizePropsDefinition,
    ...ProvideSidebarControllerPropsDefinition
  },
  setup(props, { slots }) {
    const popup = shallowRef((null as unknown) as PopupContainer);
    const top = shallowRef((null as unknown) as NoticeContainer);
    const bottom = shallowRef((null as unknown) as NoticeContainer);

    function showNotice(params: ShowNoticeOptions) {
      const options: NoticeOptions = {
        ...params,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      };
      return params.placement === 'top' ? top.value.showNotice(options) : bottom.value.showNotice(options);
    }

    function showPopup(params: ShowPopupOptions) {
      return popup.value.showPopup({
        render: params.render,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      });
    }
    provideTheme(props);
    provideNoticeController(showNotice);
    providePopupController(showPopup);
    provideWindowSize(props);
    const sidebarController = composables(props);

    return () => {
      const hasNavigationDrawer = !!slots['sidebar'];
      const nodes = [
        generateNoticeContainer('top', top),
        generateNoticeContainer('bottom', bottom),
        generatePopupContainer(popup)
      ];

      nodes.push(
        h(
          'div',
          { style: { 'z-index': 0 } },
          generateBodyContent(slots, hasNavigationDrawer, sidebarController, props.currentRoute)
        )
      );

      return h(
        'div',
        {
          class: [
            'b-app',
            {
              'has-navigation-drawer': hasNavigationDrawer && sidebarController.isVisible.value,
              'has-header': !!slots.header
            }
          ]
        },
        nodes
      );
    };
  }
});
