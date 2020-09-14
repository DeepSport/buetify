import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { watch, computed, Ref, PropType, shallowRef, toRef } from 'vue';
import { isEnterEvent } from '../../utils/eventHelpers';

export function getUseTogglePropsDefinition<K extends string>(statusName: K): UseTogglePropsDefinition<K> {
  return {
    [statusName]: {
      type: Boolean,
      default: false
    },
    hasPopup: {
      type: Boolean,
      default: false
    },
    onToggle: {
      type: Function as PropType<FunctionN<[boolean], void>>,
      required: false
    },
    onSetOn: {
      type: Function as PropType<IO<void>>,
      required: false
    },
    onSetOff: {
      type: Function as PropType<IO<void>>,
      required: false
    }
  } as UseTogglePropsDefinition<K>;
}

export type UseTogglePropsDefinition<K extends string> = {
  onToggle: {
    type: PropType<FunctionN<[boolean], void>>;
    required: false;
  };
  onSetOn: {
    type: PropType<IO<void>>;
    required: false;
  };
  onSetOff: {
    type: PropType<IO<void>>;
    required: false;
  };
} & Record<
  K,
  {
    type: PropType<boolean>;
    default: boolean;
  }
> &
  Record<
    'hasPopup',
    {
      type: PropType<boolean>;
      default: boolean;
    }
  >;

export type UseToggleProps<K extends string> = Record<K, boolean> & Record<'hasPopup', boolean>;

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

export function useToggle<K extends string>(
  props: { onToggle?: FunctionN<[boolean], void>; onSetOn?: IO<void>; onSetOff?: IO<void> } & Record<K, boolean> & {
      hasPopup: boolean;
    },
  statusName: K
) {
  const internalStatus = shallowRef(props[statusName] as boolean);
  watch(
    () => props[statusName],
    status => {
      internalStatus.value = status;
    }
  );
  watch(internalStatus, (value, oldValue) => {
    if (value !== oldValue && props.onToggle) {
      props.onToggle(value);
    }
    if (value && oldValue === false && props.onSetOn) {
      props.onSetOn();
    }
    if (value === false && oldValue === true && props.onSetOff) {
      props.onSetOff();
    }
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
