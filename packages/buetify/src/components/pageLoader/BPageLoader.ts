import './pageloader.sass';
import { FunctionalComponent, h } from 'vue';

const BPageLoader_: FunctionalComponent<{ text?: string }> = function BPageLoader(props) {
  return h('div', {
    'data-content': props.text,
    class: 'b-pageloader is-active'
  });
};

export default BPageLoader_;
