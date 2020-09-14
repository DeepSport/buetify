import { Eq } from 'fp-ts/lib/Eq';
import { Ref, customRef } from 'vue';

export function useEqRef<A>(eq: Eq<A>) {
  return (v: A): Ref<A> =>
    customRef((track, trigger) => {
      let value = v;
      return {
        get(): A {
          track();
          return value;
        },
        set(newValue: A) {
          if (!eq.equals(newValue, value)) {
            value = newValue;
            trigger();
          }
        }
      };
    });
}
