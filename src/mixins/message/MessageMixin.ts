import { ColorVariant } from 'bue/types/ColorVariants';
import { constant } from 'fp-ts/lib/function';
import Vue, { PropType } from 'vue';
import { AsyncComponent, Component, PropValidator } from 'vue/types/options';

export type MessageSize = 'is-small' | 'is-medium' | 'is-large';

export type MessageIcons = {
  [K in ColorVariant]: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
};

const DEFAULT_MESSAGE_ICONS: Partial<MessageIcons> = {
  'is-info': () => import('../../components/icons/infoCircle'),
  'is-success': () => import('../../components/icons/checkCircle'),
  'is-warning': () => import('../../components/icons/exclamationTriangle'),
  'is-danger': () => import('../../components/icons/exclamationCircle')
};

export const MessageMixin = Vue.extend({
  name: 'MessageMixin',
  props: {
    isActive: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: undefined
    } as PropValidator<string | undefined>,
    isClosable: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      default: undefined
    } as PropValidator<string | undefined>,
    variant: {
      type: String,
      default: undefined
    } as PropValidator<ColorVariant | undefined>,
    size: {
      type: String,
      default: undefined
    } as PropValidator<MessageSize | undefined>,
    iconSize: {
      type: String,
      default: undefined
    } as PropValidator<MessageSize | undefined>,
    autoClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
    },
    displayIcon: {
      type: Boolean,
      default: false
    },
    icons: {
      type: Object,
      default: constant(DEFAULT_MESSAGE_ICONS)
    } as PropValidator<MessageIcons>
  },
  data() {
    return {
      internalIsActive: this.isActive
    };
  },
  computed: {
    icon(): Component<any, any, any, any> | AsyncComponent<any, any, any, any> | undefined {
      switch (this.variant) {
        case 'is-info':
          return this.icons['is-info'];
        case 'is-success':
          return this.icons['is-success'];
        case 'is-warning':
          return this.icons['is-warning'];
        case 'is-danger':
          return this.icons['is-danger'];
        default:
          return undefined;
      }
    },
    hasTitle(): boolean {
      return !!this.title || !!this.$slots.title;
    },
    newIconSize(): string {
      return this.iconSize || this.size || 'is-large';
    },
    messageClasses(): any[] {
      return [this.variant, this.size];
    }
  },
  watch: {
    isActive(val: boolean) {
      this.internalIsActive = val;
    },
    internalIsActive: {
      handler(newValue: boolean) {
        if (newValue) {
          this.setAutoClose();
        }
      },
      immediate: true
    }
  },
  methods: {
    closeMessage() {
      this.internalIsActive = false;
      this.$emit('close');
      this.$emit('update:isActive', false);
    },
    setAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          if (this.internalIsActive) {
            close();
          }
        }, this.duration);
      }
    }
  }
});
