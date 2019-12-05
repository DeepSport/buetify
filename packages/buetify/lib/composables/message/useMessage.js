import { constant } from 'fp-ts/lib/function';
import { defineAsyncComponent, computed } from 'vue';
import { getUseTogglePropsDefinition, useToggle } from '../toggle';
const DEFAULT_MESSAGE_ICONS = {
  'is-info': defineAsyncComponent(() => import('../../components/icons/infoCircle')),
  'is-success': defineAsyncComponent(() => import('../../components/icons/checkCircle')),
  'is-warning': defineAsyncComponent(() => import('../../components/icons/exclamationTriangle')),
  'is-danger': defineAsyncComponent(() => import('../../components/icons/exclamationCircle'))
};
export function getMessageIcons(icons) {
  return { ...DEFAULT_MESSAGE_ICONS,
    ...icons
  };
}
export const UseMessagePropsDefinition = { ...getUseTogglePropsDefinition('isActive', true),
  title: {
    type: String
  },
  isClosable: {
    type: Boolean,
    default: true
  },
  message: {
    type: String
  },
  variant: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  iconSize: {
    type: String,
    default: ''
  },
  useAutoClose: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 2000
  },
  useIcon: {
    type: Boolean,
    default: false
  },
  icons: {
    type: Object,
    default: constant(DEFAULT_MESSAGE_ICONS)
  },
  icon: {
    type: Object
  }
};
export function useMessage(props) {
  const toggle = useToggle(props, 'isActive');
  const icon = computed(() => props.icon ?? props.icons[props.variant]);
  const iconSize = computed(() => props.iconSize || props.size || 'is-large');

  function setAutoClose() {
    if (props.useAutoClose) {
      setTimeout(() => {
        if (toggle.isOn.value) {
          toggle.setOff();
        }
      }, props.duration);
    }
  }

  return { ...toggle,
    icon,
    iconSize,
    setAutoClose
  };
}
//# sourceMappingURL=useMessage.js.map