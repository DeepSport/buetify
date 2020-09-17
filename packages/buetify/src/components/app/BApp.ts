import './app.sass';
import { isSome } from 'fp-ts/lib/Option';
import { defineComponent, shallowRef, h, Slots, Ref, vShow, withDirectives, VNode } from 'vue';
import {
  provideNavigationDrawerController,
  ProvideNavigationDrawerControllerPropsDefinition
} from '../../composables/navigationDrawerController';
import { provideNoticeController, ShowNoticeOptions } from '../../composables/noticeController';
import { providePopupController, ShowPopupOptions } from '../../composables/popupController';
import { provideTheme, ProvideThemePropDefinitions } from '../../composables/theme';
import { formatTransition } from '../../composables/transition';
import { provideWindowSize, ProvideWindowSizePropsDefinition } from '../../composables/windowSize';
import { TransitionClasses } from '../../types/Transition';
import BNavigationDrawer from '../navigationDrawer/BNavigationDrawer';
import BNoticeContainer, { NoticeContainer, NoticeOptions } from '../notices/noticeContainer/BNoticeContainer';
import BPopupContainer, { PopupContainer } from '../popupContainer/BPopupContainer';

const DEFAULT_TRANSITION: TransitionClasses = { name: 'fade' };

function generateNoticeContainer(placement: 'top' | 'bottom', ref: Ref<NoticeContainer>) {
  return h(BNoticeContainer, { ref, class: placement === 'top' ? 'notices-is-top' : 'notices-is-bottom' });
}

function generatePopupContainer(ref: Ref<PopupContainer>) {
  return h(BPopupContainer, { ref });
}

function generateNavigationSlot(slots: Slots) {
  return h(
    BNavigationDrawer,
    {
      isFullheight: true
    },
    slots['navigation-drawer']
  );
}

function generateMainContent(slots: Slots) {
  return h('div', { class: 'b-app-content' }, slots.default!());
}

function generateBodyContent(slots: Slots, hasNavigationDrawer: boolean, displayNavigationDrawer: boolean) {
  const nodes: VNode[] = [];
  if (slots.header) {
    const header = slots.header();
    if (header) nodes.push(...header);
  }
  nodes.push(
    h(
      'div',
      { class: 'b-app-body-content' },
      hasNavigationDrawer ? [withDirectives(generateNavigationSlot(slots), [[vShow, displayNavigationDrawer]]), generateMainContent(slots)] : [generateMainContent(slots)]
    )
  );
  return nodes
}

export default defineComponent({
  name: 'b-app',
  props: {
    ...ProvideThemePropDefinitions,
    ...ProvideWindowSizePropsDefinition,
    ...ProvideNavigationDrawerControllerPropsDefinition
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
    const { isVisible } = provideNavigationDrawerController(props);

    return () => {
      const hasNavigationDrawer = !!slots['navigation-drawer'];
      const displayNavigationDrawer = isSome(isVisible.value) && isVisible.value.value;
      const nodes = [
        generateNoticeContainer('top', top),
        generateNoticeContainer('bottom', bottom),
        generatePopupContainer(popup)
      ];

      nodes.push(...generateBodyContent(slots, hasNavigationDrawer, displayNavigationDrawer));

      return h(
        'div',
        { class: ['b-app', { 'has-navigation-drawer': hasNavigationDrawer && displayNavigationDrawer, 'has-header': !!slots.header }] },
        nodes
      );
    };
  }
});
