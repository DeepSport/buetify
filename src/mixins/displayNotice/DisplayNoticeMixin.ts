import { consoleError } from 'bue/components/utils/console';
import { getNoticeTransition } from 'bue/components/utils/helpers';
import { AllColorsVariant, ColorVariant } from 'bue/types/ColorVariants';
import { PositionVariant } from 'bue/types/PositionVariant';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { NoticeInjection, ShowNoticeOptions } from '../../types/AppInjection';
import { constant, constVoid } from 'fp-ts/lib/function';

export const DEFAULT_NOTICE_INJECTION: NoticeInjection = {
  showNotice: constant(constVoid)
};

interface options extends Vue {
  notice: NoticeInjection;
}

export const DisplayNoticeMixin = Vue.extend<options>().extend({
  name: 'DisplayNoticeInjection',
  props: {
    position: {
      type: String,
      default: 'is-bottom'
    } as PropValidator<PositionVariant>,
    duration: {
      type: Number,
      default: 2000
    },
    message: {
      type: String,
      default: undefined
    } as PropValidator<string | undefined>,
    shouldQueue: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'is-primary'
    } as PropValidator<ColorVariant>,
    isIndefinite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalCloseNotice: constVoid
    };
  },
  inject: {
    notice: {
      default: constant(DEFAULT_NOTICE_INJECTION)
    }
  },
  computed: {
    internalDuration(): number {
      return this.isIndefinite ? 0 : this.duration || 2000;
    },
    noticeClasses(): any[] {
      return [this.variant, this.position];
    }
  },
  methods: {
    mergeNoticeParams(params?: OpenNoticeParams): OpenNoticeParams {
      return {
        variant: this.variant,
        message: this.message,
        position: this.position,
        duration: this.duration,
        shouldQueue: this.shouldQueue,
        ...params
      };
    },
    closeNotice() {
      this.internalCloseNotice();
      this.internalCloseNotice = constVoid;
    },
    open(params: OpenNoticeParams) {
      const position = (params.position || this.position) as PositionVariant;
      this.internalCloseNotice = this.notice.showNotice({
        node: this.generateNotice(this.mergeNoticeParams(params)),
        placement: position.includes('top') ? 'top' : 'bottom',
        duration: params.duration !== undefined ? params.duration : this.internalDuration,
        shouldQueue: params.shouldQueue !== undefined ? params.shouldQueue : this.shouldQueue,
        transition: getNoticeTransition(position)
      });
    },
    generateNotice(params: OpenNoticeParams): VNode {
      consoleError('This is an abstract method, a concrete implementation must be put in place');
      return this.$createElement();
    },
    renderNoticeScopedSlot(): VNode {
      return this.$scopedSlots.default!({
        open: this.open,
        close: this.closeNotice
      }) as any;
    }
  },
  render(): VNode {
    return this.renderNoticeScopedSlot();
  }
});

export interface OpenNoticeParams {
  variant?: AllColorsVariant;
  message?: string;
  position?: PositionVariant;
  duration?: number;
  shouldQueue?: boolean;
}
