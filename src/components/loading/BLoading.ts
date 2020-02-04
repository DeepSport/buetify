import './loading.sass';
import { applyMixins } from '../../utils/applyMixins';
import { isEscEvent } from '../../utils/eventHelpers';
import { DisplayModalMixin } from '../../mixins/displayModal/DisplayModalMixin';
import { VNode } from 'vue';

export default applyMixins(DisplayModalMixin).extend({
  name: 'BLoading',
  props: {
    isFullscreen: {
      type: Boolean,
      default: false
    },
    canCancel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    attachToApp(): boolean {
      return this.isFullscreen;
    },
    classes(): object {
      return {
        'is-fullscreen': this.isFullscreen
      };
    }
  },
  methods: {
    cancel() {
      if (this.canCancel && this.isActive) {
        this.close();
      }
    },
    close() {
      if (this.onCancel) {
        this.onCancel();
      }
      this.$emit('close');
      this.$emit('update:is-active', false);
    },
    onKeyup(event: KeyboardEvent) {
      if (isEscEvent(event)) {
        this.cancel();
      }
    },
    generateModal(): VNode {
      return this.$createElement('div', { staticClass: 'b-loading-overlay is-active', class: this.classes }, [
        this.$createElement('div', {
          staticClass: 'loading-background',
          on: { click: this.cancel }
        }),
        this.$createElement('div', { staticClass: 'loading-icon' })
      ]);
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.onKeyup);
      this.$once('hook:beforeDestroy', () => document.removeEventListener('keyup', this.onKeyup));
    }
  },
  render(): VNode {
    if (!this.isFullscreen) {
      return this.$createElement(
        'transition',
        { props: { name: this.transition } },
        this.isActive ? [this.generateModal()] : []
      );
    } else {
      return undefined as any;
    }
  }
});
