import { watch, computed, shallowRef, toRef } from 'vue';
import { isEnterEvent } from '../../utils/eventHelpers';
export function getUseTogglePropsDefinition(statusName, defaultStatus = false) {
  return {
    [statusName]: {
      type: Boolean,
      default: defaultStatus
    },
    [`onUpdate:${statusName}`]: {
      type: Function,
      required: false
    },
    hasPopup: {
      type: Boolean,
      default: false
    },
    onToggle: {
      type: Function,
      required: false
    },
    onSetOn: {
      type: Function,
      required: false
    },
    onSetOff: {
      type: Function,
      required: false
    }
  };
}
export function getToggleAttrs(status, hasPopup) {
  return computed(() => ({
    tabindex: 0,
    role: 'button',
    type: 'button',
    'aria-pressed': status.value,
    'aria-expanded': status.value,
    ...(hasPopup.value ? {
      'aria-haspopup': true
    } : {})
  }));
}

function getListeners(toggle) {
  return {
    onClick: toggle,
    onKeydown: e => {
      if (isEnterEvent(e)) {
        e.preventDefault();
        toggle();
      }
    }
  };
}

export function useToggle(props, statusName) {
  const internalStatus = shallowRef(props[statusName]);
  const value = computed({
    get() {
      return internalStatus.value;
    },

    set(val) {
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
      const updateModel = props[`onUpdate:${statusName}`]; //eslint-disable-line

      if (updateModel) {
        updateModel(val);
      }
    }

  });
  watch(() => props[statusName], status => {
    internalStatus.value = status;
  });

  function setOn(e) {
    e && e?.stopPropagation();
    value.value = true;
  }

  function setOff(e) {
    e && e?.stopPropagation();
    value.value = false;
  }

  function toggle(e) {
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
    props: computed(() => ({ ...attrs.value,
      ...listeners
    })),
    setOn,
    setOff,
    toggle
  };
}
//# sourceMappingURL=useToggle.js.map