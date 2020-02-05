import Vue from 'vue';
import debounce from 'lodash.debounce';

export const WindowSizeMixin = Vue.extend({
  data() {
    return {
      windowWidth: window.innerWidth as number
    };
  },
  computed: {
    windowSize(): WindowSize {
      const isMobile = this.windowWidth <= BREAK_POINTS.mobile;
      const isTablet = this.windowWidth <= BREAK_POINTS.tablet && this.windowWidth > BREAK_POINTS.mobile;
      return Object.freeze({
        windowWidth: this.windowWidth,
        isMobile,
        isTablet,
        isTouch: isMobile || isTablet,
        isDesktop: this.windowWidth <= BREAK_POINTS.desktop && this.windowWidth > BREAK_POINTS.tablet,
        isWidescreen: this.windowWidth <= BREAK_POINTS.widescreen && this.windowWidth > BREAK_POINTS.desktop,
        isFullHD: this.windowWidth >= BREAK_POINTS.fullHD
      });
    }
  },
  mounted(): void {
    const resizeHandler = debounce(() => (this.windowWidth = window.innerWidth), 250);
    window.addEventListener('resize', resizeHandler, { passive: true });
    this.$once('hooks:beforeDestroy', () => window.removeEventListener('resize', resizeHandler));
  }
});

export interface WindowSize {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  isDesktop: boolean;
  isWidescreen: boolean;
  isFullHD: boolean;
}

export const BREAK_POINTS = {
  mobile: 768,
  tablet: 1023,
  desktop: 1215,
  widescreen: 1407,
  fullHD: 1408
};
