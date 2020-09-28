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
    [`onUpdate:${statusName}`]: {
      type: Function as PropType<FunctionN<[boolean], void>>,
      required: false
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
  const value = computed({
    get() {
      return internalStatus.value;
    },
    set(val: boolean) {
      const cValue = internalStatus.value;
      if (cValue !== val && props.onToggle) {
        props.onToggle(val);
      }
      if (val && props.onSetOn) {
        props.onSetOn();
      }
      if (!val && props.onSetOff) {
        props.onSetOff();
      }
      internalStatus.value = val;
      const updateModel = (props as any)[`onUpdate:${statusName}`]; //eslint-disable-line
      if (updateModel) {
        updateModel(val);
      }
    }
  });
  watch(
    () => props[statusName],
    status => {
      internalStatus.value = status;
    }
  );

  function setOn(e?: Event) {
    e && e?.stopPropagation();
    value.value = true;
  }
  function setOff(e?: Event) {
    e && e?.stopPropagation();
    value.value = false;
  }
  function toggle(e?: Event) {
    e && e?.stopPropagation();
    value.value = !value.value;
  }

  const attrs = getToggleAttrs(value, toRef(props, 'hasPopup'));
  const listeners = getListeners(toggle);
  return {
    isOn: value,
    isOff: computed(() => internalStatus.value === false),
    attrs,
    listeners,
    props: computed(() => ({ ...attrs.value, ...listeners })),
    setOn,
    setOff,
    toggle
  };
}

export type Toggle = ReturnType<typeof useToggle>;
