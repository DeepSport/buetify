import { constVoid, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { inject, PropType, ExtractPropTypes, VNode, shallowRef, onUnmounted, computed, Ref } from 'vue';
import { AllColorsVariant, ColorVariant } from '../../types/ColorVariants';
import { PositionVariant } from '../../types/PositionVariant';
import { Transition, TransitionClasses } from '../../types/Transition';
import { formatTransition } from '../transition';
import { DEFAULT_NOTICE_CONTROLLER_INJECTION, NOTICE_CONTROLLER_SYMBOL } from './provideNoticeController';

export const UseNoticePropsDefinition = {
  transition: {
    type: [Object, String] as PropType<Transition>,
    required: false
  },
  position: {
    type: String as PropType<PositionVariant>,
    default: 'is-bottom' as const
  },
  duration: {
    type: Number as PropType<number>,
    default: 2000
  },
  message: {
    type: String as PropType<string>
  },
  shouldQueue: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  variant: {
    type: String as PropType<ColorVariant>,
    default: 'is-primary' as const
  },
  isIndefinite: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export interface UseNoticeProps extends ExtractPropTypes<typeof UseNoticePropsDefinition> {};

export const DEFAULT_USE_NOTICE_PROPS: UseNoticeProps = {
  position: UseNoticePropsDefinition.position.default,
  duration: UseNoticePropsDefinition.duration.default,
  shouldQueue: UseNoticePropsDefinition.shouldQueue.default,
  variant: UseNoticePropsDefinition.variant.default,
  isIndefinite: UseNoticePropsDefinition.isIndefinite.default
}

function useNoticeTransition(props: UseNoticeProps = DEFAULT_USE_NOTICE_PROPS): Ref<TransitionClasses> {
  return computed(() => {
    if (!!props.transition) {
      return formatTransition(props.transition);
    } else {
      switch (props.position) {
        case 'is-top-right':
        case 'is-top':
        case 'is-top-left':
          return {
            'enter-active-class': 'fadeInDown',
            'leave-active-class': 'fadeOut'
          };
        case 'is-bottom-right':
        case 'is-bottom':
        case 'is-bottom-left':
          return {
            'enter-active-class': 'fadeInUp',
            'leave-active-class': 'fadeOut'
          };
      }
    }
  });
}

export interface RenderNoticeOptions {
  variant?: AllColorsVariant;
  message?: string;
  position?: PositionVariant;
}

export interface OpenNoticeOptions extends RenderNoticeOptions {
  duration?: number;
  shouldQueue?: boolean;
  transition?: Transition;
}

export function useNoticeController(props: UseNoticeProps, render: Ref<FunctionN<[RenderNoticeOptions], IO<VNode[]>>>) {
  const remove = shallowRef(constVoid);
  const { showNotice } = inject(NOTICE_CONTROLLER_SYMBOL, DEFAULT_NOTICE_CONTROLLER_INJECTION);
  const transition = useNoticeTransition(props);
  onUnmounted(() => {
    remove.value();
  });
  function open(options: OpenNoticeOptions) {
    const position = options.position ?? props.position;
    remove.value();
    remove.value = showNotice({
      placement: position.includes('top') ? 'top' : 'bottom',
      render: render.value(options),
      transition: options.transition ?? transition.value,
      shouldQueue: options.shouldQueue ?? props.shouldQueue,
      duration: options.duration ?? props.duration
    });
  }

  return {
    open: open,
    close: () => {
      remove.value();
      remove.value = constVoid;
    }
  };
}

export type NoticeController = ReturnType<typeof useNoticeController>;
