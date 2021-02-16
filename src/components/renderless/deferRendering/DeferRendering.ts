import { shallowRef, onMounted, defineComponent, Ref } from 'vue';

function useCheckRenderingStatus(frames: number, currentFrame: Ref<number>) {
  return () => {
    if (frames > 0) {
      if (window && window.requestAnimationFrame) {
        const step = () => {
          requestAnimationFrame(() => {
            if (currentFrame.value < frames) {
              currentFrame.value++;
              step();
            }
          });
        };
        step();
      } else {
        setTimeout(() => (currentFrame.value = frames), frames * 16);
      }
    }
  };
}

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
    onMounted(useCheckRenderingStatus(props.frames, currentFrame));
    return () => {
      if (currentFrame.value >= props.frames && slots.default) {
        return slots.default();
      } else {
        return undefined;
      }
    };
  }
});

