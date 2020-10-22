import './sidebar.sass';
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { useWindowSize } from '../../composables/windowSize';
import { SlideRightTransition } from '../../transitions/slideRightTransition';
import {
  defineComponent,
  SetupContext,
  VNode,
  h,
  PropType,
  computed,
  watch,
  toRef,
  ExtractPropTypes,
  withDirectives,
  vShow
} from 'vue';
import BOverlay from '../overlay/BOverlay';
import { SidebarController, useSidebarController } from './composables';
import { SidebarThemeMap } from './theme';

export const BSidebarPropsDefinition = {
  ...useThemePropsDefinition(SidebarThemeMap),
  tag: {
    type: String as PropType<string>,
    default: 'nav'
  },
  currentRoute: {
    required: false
  }
};

export type BNavigationDrawerProps = ExtractPropTypes<typeof BSidebarPropsDefinition>;

function generateDrawer(
  props: BNavigationDrawerProps,
  controller: SidebarController,
  themeClasses: string[],
  context: SetupContext
): VNode {
  return h(
    props.tag,
    {
      class: ['b-sidebar', ...themeClasses]
    },
    context.slots.default &&
      context.slots.default({
        showSidebar: controller.show,
        hideSidebar: controller.hide,
        sidebarIsVisible: controller.isVisible.value,
        toggleSidebar: controller.toggle
      })
  );
}

function generateMobileDrawer(
  props: BNavigationDrawerProps,
  controller: SidebarController,
  themeClasses: string[],
  context: SetupContext
): VNode {
  return h(SlideRightTransition, undefined, () =>
    withDirectives(
      h(
        BOverlay,
        {
          class: 'is-left',
          isActive: controller.isVisible.value,
          onClick: controller.hide
        },
        () => generateDrawer(props, controller, themeClasses, context)
      ),
      [[vShow, controller.isVisible.value]]
    )
  );
}

export default defineComponent({
  name: 'b-sidebar',
  props: BSidebarPropsDefinition,
  setup(props, context) {
    const controller = useSidebarController();
    const windowSize = useWindowSize();
    const { themeClasses } = useTheme(props);
    const useSideDrawer = computed(() => {
      return windowSize.value.isTouch || windowSize.value.isDesktop;
    });
    watch(
      useSideDrawer,
      (newValue, oldValue) => {
        if (newValue === oldValue && oldValue !== undefined) {
          return;
        }
        if (newValue) {
          controller.hide();
        } else {
          controller.show();
        }
      },
      { immediate: true }
    );
    watch(
      toRef(props, 'currentRoute'),
      () => {
        if (useSideDrawer.value) {
          controller.hide();
        }
      },
      {
        deep: false
      }
    );
    return () => {
      if (useSideDrawer.value) {
        return generateMobileDrawer(props, controller, themeClasses.value, context);
      } else {
        return generateDrawer(props, controller, themeClasses.value, context);
      }
    };
  }
});
