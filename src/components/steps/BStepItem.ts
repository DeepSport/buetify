import { toUndefined } from 'fp-ts/lib/Option';
import { defineComponent, inject, h } from 'vue';
import { BStepItemPropsDefinition, DEFAULT_STEP_INJECTION, STEP_ITEM_NAME, STEPS_SYMBOL } from './shared';

export default defineComponent({
	name: STEP_ITEM_NAME,
	props: BStepItemPropsDefinition,
	setup(props, { slots }) {
		const injection = inject(STEPS_SYMBOL, DEFAULT_STEP_INJECTION);

		return () => {
			return [
				h(
					'section',
					{
						class: 'step-item',
						'aria-label': props.label
					},
					slots.default!({ isActive: toUndefined(injection.activeLabel.value) === props.label })
				)
			];
		}

	}
});
