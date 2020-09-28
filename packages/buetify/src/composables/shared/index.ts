import { constant } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { Eq, fromEquals } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { deepEqual } from '../../utils/helpers';

export type Remove = IO<void>;

const eqDeep: Eq<any> = fromEquals(deepEqual);

export function getEqPropsDefinition<T>(eq: Eq<T> = eqDeep) {
  return {
    eq: {
      type: Object as PropType<Eq<T>>,
      default: constant(eq)
    }
  };
}

export interface EqProps<T> {
  eq: Eq<T>;
}
