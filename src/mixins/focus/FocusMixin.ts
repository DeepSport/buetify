import { applyMixins } from '../../utils/applyMixins';
import { RefMixin } from '../ref/RefMixin';
import { constant, constFalse, constVoid } from 'fp-ts/lib/function';
import { filter, fold, fromNullable, map, mapNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export function getFocusMixin(ref: string) {
  return applyMixins(RefMixin).extend({
    name: 'FocusMixin',
    methods: {
      focus(): void {
        pipe(
          this.getRefElement(ref),
          fold(constant(constVoid), el => {
            return () => this.$nextTick(() => el.focus());
          })
        )();
      }
    }
  });
}

export const InputFocusMixin = getFocusMixin('input');
