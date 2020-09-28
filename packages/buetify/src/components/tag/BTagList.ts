import './tag.sass';
import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'b-tag-list',
  props: {
    isAttached: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, { slots }) {
    return () => h(props.tag, { class: ['tags', { 'has-addons': props.isAttached }]}, slots.default && slots.default());
  }
})
