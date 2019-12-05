import { constant } from 'fp-ts/lib/function';
import { none, some } from 'fp-ts/lib/Option';
import debounce from 'lodash.debounce';
import { watchEffect, provide, shallowRef, computed, onMounted, onUnmounted } from 'vue';
export const DEFAULT_WINDOW_SIZE_INJECTION = {
  windowSize: shallowRef(none)
};
export const DEFAULT_BREAK_POINTS = shallowRef({
  mobile: 768,
  tablet: 1023,
  desktop: 1215,
  widescreen: 1407,
  fullHD: 1408
});
export const WINDOW_SIZE_SYMBOL = Symbol('window-size');
export const ProvideWindowSizePropsDefinition = {
  breakPoints: {
    type: Object,
    required: false,
    default: constant(DEFAULT_BREAK_POINTS.value)
  }
};
export function getWindowSize() {
  const windowWidth = shallowRef(window.innerWidth);
  const resizeHandler = debounce(() => {
    windowWidth.value = window.innerWidth;
  }, 250);
  onMounted(() => window.addEventListener('resize', resizeHandler, {
    passive: true
  }));
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
export function provideWindowSize(props) {
  watchEffect(() => {
    DEFAULT_BREAK_POINTS.value = props.breakPoints;
  });
  const windowSize = getWindowSize();
  const injection = {
    windowSize: computed(() => some(windowSize.value))
  };
  provide(WINDOW_SIZE_SYMBOL, injection);
  return {
    windowSize
  };
}
//# sourceMappingURL=provideWindowSize.js.map