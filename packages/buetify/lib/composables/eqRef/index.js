import { customRef } from 'vue';
export function useEqRef(eq) {
  return v => customRef((track, trigger) => {
    let value = v;
    return {
      get() {
        track();
        return value;
      },

      set(newValue) {
        if (!eq.equals(newValue, value)) {
          value = newValue;
          trigger();
        }
      }

    };
  });
}
//# sourceMappingURL=index.js.map