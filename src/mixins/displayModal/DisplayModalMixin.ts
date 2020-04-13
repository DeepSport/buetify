import { IO } from 'fp-ts/lib/IO';
import { applyMixins, ExtractVue } from '../../utils/applyMixins';
import { ModalInjection } from '../../types/AppInjection';
import { consoleError } from '../../utils/console';
import { constant, constVoid } from 'fp-ts/lib/function';
import { PropType, VNode } from 'vue';
import { getToggleMixin } from '../toggle/ToggleMixin';

const base = applyMixins(getToggleMixin('isActive', true));

export interface options extends ExtractVue<typeof base> {
  modal: ModalInjection;
}

const DEFAULT_MODAL_INJECTION: ModalInjection = {
  showModal: constant(constVoid)
};

export const DisplayModalMixin = base.extend<options>().extend({
  name: 'DisplayModalMixin',
  props: {
    transition: {
      type: String,
      default: 'fade'
    },
    onCancel: {
      type: Function as PropType<IO<void>>,
      required: false
    }
  },
  inject: {
    modal: {
      default: constant(DEFAULT_MODAL_INJECTION)
    }
  },
  data() {
    return {
      hasMounted: false,
      removeModal: constVoid
    };
  },
  computed: {
    internalStatus: {
      get(): boolean {
        return this.lazyStatus && this.hasMounted;
      },
      set(newVal: boolean) {
        if (newVal !== this.lazyStatus) {
          this.lazyStatus = newVal;
          if (newVal === false) {
            this.$emit('close');
          }
        }
      }
    },
    triggerScopedProps(): object {
      return Object.freeze({
        isOpen: this.internalStatus,
        open: this.setOn,
        close: this.close,
        toggle: this.toggle,
        attrs: this.attrs,
        listeners: this.listeners
      });
    },
    attachToApp(): boolean {
      return true;
    }
  },
  watch: {
    internalStatus: {
      handler(newValue: boolean) {
        if (newValue) {
          this.removeModal = this.modal.showModal({
            render: () => [this.generateModal()],
            transition: this.transition
          });
        } else {
          this.removeModal();
          this.removeModal = constVoid;
        }
      }
    }
  },
  beforeMount() {
    this.hasMounted = true;
  },
  methods: {
    close() {
      this.internalStatus = false;
    },
    generateModal(): VNode {
      consoleError('This is an abstract method, a concrete implementation must be put in place');
      return this.$createElement();
    }
  },
  beforeDestroy() {
    this.removeModal();
  },
  render(): any {
    return (
      this.$scopedSlots.trigger &&
      this.$scopedSlots.trigger(this.triggerScopedProps)
    );
  }
});
