import { shallowRef, onMounted, defineComponent } from 'vue';

export const DeferRendering = defineComponent({
	name: 'defer-rendering',
	props: {
		frames: {
			type: Number,
			required: true
		}
	},
	setup(props, { slots }) {
		const currentFrame = shallowRef(0);
		function checkRenderingStatus() {
			if (props.frames > 0) {
				if (window && window.requestAnimationFrame) {
					const step = () => {
						requestAnimationFrame(() => {
							if (currentFrame.value < props.frames) {
								currentFrame.value++;
								step();
							}
						});
					};
					step();
				} else {
					setTimeout(() => (currentFrame.value = props.frames), props.frames * 16);
				}
			}
		}
		onMounted(checkRenderingStatus);
		return () => {
			if (currentFrame.value >= props.frames) {
				return slots.default!();
			} else {
				return undefined;
			}
		};
	}
});
