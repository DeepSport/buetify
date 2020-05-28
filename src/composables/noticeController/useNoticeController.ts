import { constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { inject, PropType, ExtractPropTypes, VNode, shallowRef, watch, onUnmounted, computed, Ref, toRef } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { PositionVariant } from '../../types/PositionVariant';
import { Transition, TransitionClasses } from '../../types/Transition';
import { getToggleAttrs, getUseTogglePropsDefinition, useToggle } from '../toggle';
import { formatTransition } from '../transition';
import { DEFAULT_NOTICE_CONTROLLER_INJECTION, NOTICE_CONTROLLER_SYMBOL } from './provideNoticeController';

export const UseNoticePropsDefinition = {
  ...getUseTogglePropsDefinition('isActive'),
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

export type UseNoticeProps = ExtractPropTypes<typeof UseNoticePropsDefinition>;

function useNoticeTransition(props: UseNoticeProps): Ref<TransitionClasses> {
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

export function useNoticeController(props: UseNoticeProps, render: Ref<IO<VNode[]>>) {
  const hasMounted = shallowRef(false);
  const remove = shallowRef(constVoid);
  const { isOn, setOn, setOff, toggle, listeners } = useToggle(props, 'isActive');
  const { showNotice } = inject(NOTICE_CONTROLLER_SYMBOL, DEFAULT_NOTICE_CONTROLLER_INJECTION);
  const isOpen = computed(() => hasMounted.value && isOn.value);
  const attrs = getToggleAttrs(isOpen, toRef(props, 'hasPopup'));
  const transition = useNoticeTransition(props);
  watch(isOpen, newValue => {
    if (newValue) {
      remove.value();
      remove.value = showNotice({
        placement: props.position.includes('top') ? 'top' : 'bottom',
        render: render.value,
        transition: transition.value,
        shouldQueue: props.shouldQueue,
        duration: props.duration
      });
    } else {
      remove.value();
      remove.value = constVoid;
    }
  });
  onUnmounted(() => {
    remove.value();
  });
  return {
    isOpen,
    attrs,
    listeners,
    open: setOn,
    close: setOff,
    toggle: toggle
  };
}

export type NoticeController = ReturnType<typeof useNoticeController>;
