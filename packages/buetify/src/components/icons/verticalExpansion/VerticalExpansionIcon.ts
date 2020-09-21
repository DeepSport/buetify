import './vertical-expansion-icon.sass';
import { h, defineComponent } from 'vue';
import { AngleDownIcon } from '../angleDown';

export default defineComponent({
  name: 'vertical-expansion-icon',
  props: {
    isExpanded: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return () =>
      h(AngleDownIcon, {
        class: ['vertical-expansion-icon', { 'is-expanded': props.isExpanded }]
      });
  }
});
