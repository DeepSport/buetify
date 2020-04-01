import Vue from 'vue';
import debounce from 'lodash.debounce';

export interface WindowSize {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  isDesktop: boolean;
  isWidescreen: boolean;
  isFullHD: boolean;
}

export const BREAK_POINTS = Vue.observable({
  mobile: 768,
  tablet: 1023,
  desktop: 1215,
  widescreen: 1407,
  fullHD: 1408
});

let DEFAULT_WINDOW_SIZE = getWindowSize(window.innerWidth);

export const WINDOW_SIZE_INJECTION = {
  windowSize: {
    default: () => DEFAULT_WINDOW_SIZE
  }
};

function getWindowSize(windowWidth: number): WindowSize {
  const isMobile = windowWidth <= BREAK_POINTS.mobile;
  const isTablet = windowWidth <= BREAK_POINTS.tablet && windowWidth > BREAK_POINTS.mobile;
  return Object.freeze({
    windowWidth: windowWidth,
    isMobile,
    isTablet,
    isTouch: isMobile || isTablet,
    isDesktop: windowWidth <= BREAK_POINTS.desktop && windowWidth > BREAK_POINTS.tablet,
    isWidescreen: windowWidth <= BREAK_POINTS.widescreen && windowWidth > BREAK_POINTS.desktop,
    isFullHD: windowWidth >= BREAK_POINTS.fullHD
  });
}

export const WindowSizeMixin = Vue.extend({
  data() {
    return {
      windowSize: DEFAULT_WINDOW_SIZE
    };
  },

  mounted(): void {
    const resizeHandler = debounce(() => {
      const newSize = getWindowSize(window.innerWidth);
      this.windowSize = newSize;
      DEFAULT_WINDOW_SIZE = newSize;
    }, 250);
    window.addEventListener('resize', resizeHandler, { passive: true });
    this.$once('hooks:beforeDestroy', () => window.removeEventListener('resize', resizeHandler));
  }
});
