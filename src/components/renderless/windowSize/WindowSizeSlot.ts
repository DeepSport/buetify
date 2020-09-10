import { defineComponent } from 'vue';
import { useWindowSize } from '../../../composables/windowSize';

export const WindowSizeSlot = defineComponent({
	name: 'window-size',
	setup(_, { slots }) {
		const windowSize = useWindowSize();
		return () => slots.default && slots.default(windowSize.value);
	}
});
