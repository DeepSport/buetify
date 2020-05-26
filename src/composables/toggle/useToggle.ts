import { IO } from 'fp-ts/lib/IO';
import { watch, computed, Ref, PropType, ref, ExtractPropTypes, toRef } from 'vue';
import { isEnterEvent } from '../../utils/eventHelpers';

export function getUseTogglePropsDefinition<K extends string>(statusName: K) {
  return {
    [statusName]: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    hasPopup: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  } as UseTogglePropsDefinition<K>;
}

export type UseTogglePropsDefinition<K extends string> = Record<
  K,
  { type: PropType<boolean>; default: false }
> & {
  hasPopup: {
    type: PropType<boolean>;
    default: false;
  };
};

export type UseToggleProps<K extends string> = ExtractPropTypes<UseTogglePropsDefinition<K>>

export function getToggleAttrs(status: Ref<boolean>, hasPopup: Ref<boolean>) {
  return computed(() => ({
    tabindex: 0,
    role: 'button',
    type: 'button',
    'aria-pressed': status.value,
    'aria-expanded': status.value,
    ...(hasPopup.value ? { 'aria-haspopup': true } : {})
  }));
}

export type ToggleAttrs = ReturnType<typeof getToggleAttrs> extends Ref<infer A> ? A : never;

function getListeners(toggle: IO<void>) {
  return {
    onClick: toggle,
    onKeydown: (e: KeyboardEvent) => {
      if (isEnterEvent(e)) {
        e.preventDefault();
        toggle();
      }
    }
  };
}

export type ToggleListeners = ReturnType<typeof getListeners>;

export function useToggle<K extends string>(props: Record<K, boolean> & { hasPopup: boolean }, statusName: K) {
  const internalStatus = ref(props[statusName] as boolean);
  watch(props, newProps => {
    internalStatus.value = newProps[statusName];
  });
  function setOn() {
    internalStatus.value = true;
  }
  function setOff() {
    internalStatus.value = false;
  }
  function toggle() {
    internalStatus.value = !internalStatus.value;
  }
  const attrs = getToggleAttrs(internalStatus, toRef(props, 'hasPopup'));
  const listeners = getListeners(toggle);
  return {
    isOn: internalStatus,
    isOff: computed(() => internalStatus.value === false),
    attrs,
    listeners,
    setOn,
    setOff,
    toggle
  };
}

export type Toggle = ReturnType<typeof useToggle>;
