import './pageloader.sass';
import { h } from 'vue';

export default function BPageLoader(props: { text: string }) {
  return h('div', {
    'data-content': props.text,
    class: 'b-pageloader is-active'
  });
}
