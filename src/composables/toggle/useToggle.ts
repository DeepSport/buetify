import {IO} from 'fp-ts/lib/IO';
import { watch, computed, Ref } from 'vue';
import {Param} from '../../types/Param';
import {isEnterEvent} from '../../utils/eventHelpers';
import {toRef} from '../../utils/toRef';

export function useToggle(status: Param<boolean>, hasPopup: Param<boolean> = false) {
	const _status = toRef(status);
	const _hasPopup = toRef(hasPopup);
	const internalStatus = toRef(status);
	watch(_status, (newStatus) => { internalStatus.value = newStatus })
	function setOn() {
		internalStatus.value = true;
	}
	function setOff() {
		internalStatus.value = false;
	}
	function toggle() {
		internalStatus.value = !internalStatus.value
	}
	const attrs = getAttrs(_status, _hasPopup);
	const listeners = getListeners(toggle);
	return {
		isOn: internalStatus,
		isOff: computed(() => internalStatus.value === false),
		attrs,
		listeners,
		setOn,
		setOff,
		toggle
	}
}

function getAttrs(status: Ref<boolean>, hasPopup: Ref<boolean>) {
	return computed(() => ({
		tabindex: 0,
		role: 'button',
		type: 'button',
		'aria-pressed': status.value,
		'aria-expanded': status.value,
		...(hasPopup.value ? { 'aria-haspopup': true } : {})
	}));;
}

function getListeners(toggle: IO<void>) {
	return {
		onClick: toggle,
		onKeydown: (e: KeyboardEvent) => {
			if (isEnterEvent(e)) {
				e.preventDefault();
				toggle()
			}
		}
	}
}
