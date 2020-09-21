import { constant } from 'fp-ts/lib/function';
import { none, Option, some } from 'fp-ts/lib/Option';
import debounce from 'lodash.debounce';
import {
  watchEffect,
  provide,
  shallowRef,
  Ref,
  PropType,
  ExtractPropTypes,
  computed,
  onMounted,
  onUnmounted
} from 'vue';

export interface WindowSize {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  isDesktop: boolean;
  isWidescreen: boolean;
  isFullHD: boolean;
}

export interface WindowSizeInjection {
  windowSize: Ref<Option<WindowSize>>;
}

export const DEFAULT_WINDOW_SIZE_INJECTION: WindowSizeInjection = {
  windowSize: shallowRef(none)
};

export const DEFAULT_BREAK_POINTS = shallowRef({
  mobile: 768,
  tablet: 1023,
  desktop: 1215,
  widescreen: 1407,
  fullHD: 1408
});

export type BreakPoints = typeof DEFAULT_BREAK_POINTS.value;

export const WINDOW_SIZE_SYMBOL = Symbol('window-size');

export const ProvideWindowSizePropsDefinition = {
  breakPoints: {
    type: Object as PropType<BreakPoints>,
    required: false,
    default: constant(DEFAULT_BREAK_POINTS.value)
  }
};

export type ProvideWindowSizeProps = ExtractPropTypes<typeof ProvideWindowSizePropsDefinition>;

export function getWindowSize(): Ref<WindowSize> {
  const windowWidth = shallowRef(window.innerWidth);

  const resizeHandler = debounce(() => {
    windowWidth.value = window.innerWidth;
  }, 250);

  onMounted(() => window.addEventListener('resize', resizeHandler, { passive: true }));
  onUnmounted(() => window.removeEventListener('resize', resizeHandler));

  return computed(() => {
    const breakPoints = DEFAULT_BREAK_POINTS.value;
    const innerWidth = windowWidth.value;
    const isMobile = innerWidth <= breakPoints.mobile;
    const isTablet = innerWidth <= breakPoints.tablet && innerWidth > breakPoints.mobile;
    return {
      windowWidth: innerWidth,
      isMobile,
      isTablet,
      isTouch: isMobile || isTablet,
      isDesktop: innerWidth <= breakPoints.desktop && innerWidth > breakPoints.tablet,
      isWidescreen: innerWidth <= breakPoints.widescreen && innerWidth > breakPoints.desktop,
      isFullHD: innerWidth >= breakPoints.fullHD
    };
  });
}

export function provideWindowSize(props: ProvideWindowSizeProps) {
  watchEffect(() => {
    DEFAULT_BREAK_POINTS.value = props.breakPoints;
  });
  const windowSize = getWindowSize();

  const injection: WindowSizeInjection = {
    windowSize: computed(() => some(windowSize.value))
  };

  provide(WINDOW_SIZE_SYMBOL, injection);

  return {
    windowSize
  };
}
