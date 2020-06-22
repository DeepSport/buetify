import { h, defineComponent, PropType } from 'vue';

const ComponentA = defineComponent({
  name: 'component-a',
  props: {
    isFullheight: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    isThemeable: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props, { slots }) {
    return () => h('div', slots.default!(props));
  }
})

const ComponentB = defineComponent({
  name: 'component-b',
  setup() {
    return () => h(ComponentA, {
      isFullheight: true
    });
  }
})
