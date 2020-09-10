import { isSome, none } from 'fp-ts/lib/Option';
import { shallowRef, inject, computed } from 'vue';
import { getWindowSize, WINDOW_SIZE_SYMBOL, WindowSizeInjection } from './provideWindowSize';

export function useWindowSize() {
	const injection = inject(WINDOW_SIZE_SYMBOL, { windowSize: shallowRef(none) } as WindowSizeInjection);
	return computed(() =>
		isSome(injection.windowSize.value) ? injection.windowSize.value.value : getWindowSize().value
	);
}
