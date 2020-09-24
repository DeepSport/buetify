import { constant } from 'fp-ts/lib/function';
import { fromEquals } from 'fp-ts/lib/Eq';
import { deepEqual } from '../../utils/helpers';
const eqDeep = fromEquals(deepEqual);
export function getEqPropsDefinition(eq = eqDeep) {
  return {
    eq: {
      type: Object,
      default: constant(eq)
    }
  };
}
//# sourceMappingURL=index.js.map