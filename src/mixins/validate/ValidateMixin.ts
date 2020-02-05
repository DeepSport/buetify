import { applyMixins } from '../../utils/applyMixins';
import { constant, constVoid } from 'fp-ts/lib/function';
import { filter, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { isString } from '../../utils/helpers';
import { DisableMixin } from '../disable/DisableMixin';
import { RefMixin } from '../ref';

export function getValidateMixin(ref: string) {
  return applyMixins(RefMixin, DisableMixin).extend({
    name: 'ValidateMixin',
    props: {
      useNativeValidation: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isValid: true
      };
    },
    watch: {
      isValid: {
        handler(newValue: boolean, oldValue: boolean) {
          if (newValue !== oldValue) {
            this.$emit('new-validity', newValue);
          }
        },
        immediate: true
      }
    },
    methods: {
      validate(): void {
        if (this.useNativeValidation && !this.disabled) {
          pipe(
            this.getRefElement(ref),
            filter(isHtmlInputElement),
            fold(constant(constVoid), el => {
              return () => {
                if (!el.checkValidity()) {
                  this.$nextTick(() => {
                    this.$emit('new-variant', 'is-danger');
                    this.$emit('new-message', el.validationMessage);
                    this.isValid = false;
                  });
                } else {
                  this.$nextTick(() => {
                    this.$emit('new-variant', '');
                    this.$emit('new-message', '');
                    this.isValid = true;
                  });
                }
              };
            })
          )();
        }
      }
    }
  });
}

export const InputValidateMixin = getValidateMixin('input');

function isHtmlInputElement(el: HTMLElement): el is HTMLInputElement {
  const newEl = (el as unknown) as HTMLInputElement;
  return typeof newEl.checkValidity === 'function' && isString(newEl.validationMessage);
}
