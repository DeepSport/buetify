import './horizontal-expansion-icon.sass';
import { defineComponent, h } from 'vue';
import { AngleRightIcon } from '../angleRight';

export default defineComponent({
  name: 'horizontal-expansion-icon',
  props: {
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return () =>
      h(AngleRightIcon, {
        class: ['horizontal-expansion-icon', { 'is-expanded': props.isExpanded }]
      });
  }
});
