import { deepEqual } from '../../utils/helpers';
import { Eq, fromEquals } from 'fp-ts/lib/Eq';
import Vue from 'vue';
import { PropValidator } from 'vue/types/options';

export const EqMixin = Vue.extend({
  name: 'EqMixin',
  props: {
    valueComparator: ({
      type: Function,
      required: false,
      default: deepEqual
    } as any) as PropValidator<typeof deepEqual>
  },
  computed: {
    eq(): Eq<any> {
      return fromEquals(this.valueComparator);
    }
  }
});
