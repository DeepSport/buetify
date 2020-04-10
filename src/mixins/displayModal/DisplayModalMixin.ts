import { IO } from 'fp-ts/lib/IO';
import { applyMixins, ExtractVue } from '../../utils/applyMixins';
import { RegenerateSlotMixin } from '../regenerateSlot/RegenerateSlotMixin';
import { ModalInjection } from '../../types/AppInjection';
import { consoleError } from '../../utils/console';
import { constant, constVoid } from 'fp-ts/lib/function';
import { isSome, none, Option, some } from 'fp-ts/lib/Option';
import { PropType, VNode } from 'vue';
import { getToggleMixin } from '../toggle/ToggleMixin';

const base = applyMixins(RegenerateSlotMixin, getToggleMixin();

export interface options extends ExtractVue<typeof base> {
  modal: ModalInjection;()
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
      lazyIsActive: this.isActive,
      removeModal: constVoid
    };
  },
  computed: {
    internalIsActive: {
      get(): boolean {
        return this.lazyIsActive && this.hasMounted;
      },
      set(newVal: boolean) {
        this.lazyIsActive = newVal;
        if (newVal === false) {
          this.$emit('close');
        }
      }
    },
    node(): Option<VNode> {
      return this.internalIsActive && this.attachToApp ? some(this.generateModal()) : none;
    },
    attachToApp(): boolean {
      return true;
    },
    listeners(): Record<string, Function | Function[]> {
      const listeners = { ...this.$listeners };
      delete listeners.close;
      return listeners;
    }
  },
  watch: {
    isActive(newVal: boolean) {
      if (newVal !== this.lazyIsActive) {
        this.lazyIsActive = newVal;
      }
    },
    node: {
      handler(newValue: Option<VNode>) {
        if (isSome(newValue)) {
          this.removeModal = this.modal.showModal({
            node: newValue.value,
            transition: this.transition
          });
        } else {
          setTimeout(() => {
            this.removeModal();
            if (this.onCancel) {
              this.onCancel();
            }
            this.removeModal = constVoid;
          }, 150);
        }
      }
    }
  },
  beforeMount() {
    this.hasMounted = true;
  },
  methods: {
    close() {
      // @ts-ignore
      this.internalIsActive = false;
    },
    generateModal(): VNode {
      consoleError('This is an abstract method, a concrete implementation must be put in place');
      return this.$createElement();
    }
  },
  beforeDestroy() {
    this.removeModal();
  },
  render(): any {}
});
