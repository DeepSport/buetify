import { inject } from 'vue';
import { DEFAULT_FIELD_DATA_INJECTION, PROVIDE_FIELD_DATA_INJECTION_SYMBOL } from './provideFieldData';
export function useFieldData() {
  return inject(PROVIDE_FIELD_DATA_INJECTION_SYMBOL, DEFAULT_FIELD_DATA_INJECTION);
}
//# sourceMappingURL=useFieldData.js.map