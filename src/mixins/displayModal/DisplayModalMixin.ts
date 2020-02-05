import { IO } from 'fp-ts/lib/IO';
import { applyMixins, ExtractVue } from '../../utils/applyMixins';
import { RegenerateSlotMixin } from '../regenerateSlot/RegenerateSlotMixin';
import { ModalInjection } from '../../types/AppInjection';
import { consoleError } from '../../utils/console';
import { constant, constVoid } from 'fp-ts/lib/function';
import { isSome, none, Option, some } from 'fp-ts/lib/Option';
import { PropType, VNode } from 'vue';

const base = applyMixins(RegenerateSlotMixin);

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
    isActive: {
      type: Boolean,
      required: true
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
      removeModal: constVoid
    };
  },
  computed: {
    node(): Option<VNode> {
      return this.isActive && this.attachToApp ? some(this.generateModal()) : none;
    },
    attachToApp(): boolean {
      return true;
    }
  },
  watch: {
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
      },
      immediate: true
    }
  },
  methods: {
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
