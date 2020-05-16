import { Ref, computed } from 'vue'
import {Param} from '../../types/Param';
import {toRef} from '../../utils/toRef';

export function useDisable(isDisabled: Param<boolean> = false, isReadonly: Param<boolean> = false, disableIfReadonly: Param<boolean> = false): Ref<boolean> {
	const _isDisabled = toRef(isDisabled);
	const _isReadonly = toRef(isReadonly);
	const _disableIfReadonly = toRef (disableIfReadonly);
	return computed(() => _isDisabled.value || (_isReadonly.value && _disableIfReadonly.value));
}
