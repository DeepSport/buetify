import './navigation-drawer.sass';
import {
  NavigationDrawerController,
  useNavigationDrawerController
} from '../../composables/navigationDrawerController';
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import { useWindowSize } from '../../composables/windowSize';
import { SlideRightTransition } from '../../transitions/slideRightTransition';
import {
  defineComponent,
  SetupContext,
  VNode,
  h,
  PropType,
  computed,
  watchEffect,
  watch,
  toRef,
  ExtractPropTypes
} from 'vue';
import BOverlay from '../overlay/BOverlay';
import { NavigationDrawerThemeMap } from './theme';

export const BNavigationDrawerPropsDefinition = {
  ...getUseThemePropsDefinition(NavigationDrawerThemeMap),
  tag: {
    type: String as PropType<string>,
    default: 'nav'
  },
  isFullheight: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  currentRoute: {
    type: Object as PropType<object>,
    required: false
  }
};

export type BNavigationDrawerProps = ExtractPropTypes<typeof BNavigationDrawerPropsDefinition>;

function generateDrawer(
  props: BNavigationDrawerProps,
  controller: NavigationDrawerController,
  themeClasses: string[],
  context: SetupContext
): VNode {
  return h(
    props.tag,
    {
      class: ['b-navigation-drawer', { 'is-fullheight': props.isFullheight }, ...themeClasses]
    },
    context.slots.default &&
    context.slots.default({
      showNavigationDrawer: controller.show,
      hideNavigationDrawer: controller.hide,
      navigationDrawerIsVisible: controller.isVisible.value,
      toggleNavigationDrawer: controller.toggle
    })
  );
}

function generateMobileDrawer(
  props: BNavigationDrawerProps,
  controller: NavigationDrawerController,
  themeClasses: string[],
  context: SetupContext
): VNode {
  return h(SlideRightTransition, [
    h(
      BOverlay,
      {
        class: 'is-left',
        isActive: controller.isVisible.value,
        onClick: controller.hide
      },
      [generateDrawer(props, controller, themeClasses, context)]
    )
  ]);
}

export default defineComponent({
  name: 'b-navigation-drawer',
  props: BNavigationDrawerPropsDefinition,
  setup(props, context) {
    const controller = useNavigationDrawerController();
    const windowSize = useWindowSize();
    const { themeClasses } = useTheme(props);
    const useSideDrawer = computed(() => windowSize.value.isTouch || windowSize.value.isDesktop);
    watchEffect(() => (useSideDrawer.value ? controller.hide() : controller.show()));
    watch(toRef(props, 'currentRoute'), newVal => {
      if (useSideDrawer.value) {
        controller.hide();
      }
    });
    return () => {
      if (useSideDrawer.value) {
        return generateMobileDrawer(props, controller, themeClasses.value, context);
      } else {
        return generateDrawer(props, controller, themeClasses.value, context);
      }
    };
  }
});
