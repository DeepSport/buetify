import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'b-navbar-menu',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: ['navbar-menu', { isActive: props.isActive }]
        },
        slots.default && slots.default()
      );
  }
});
