import "../../../src/components/pageLoader/pageloader.sass";
import { h } from 'vue';
export default function BPageLoader(props) {
  return h('div', {
    'data-content': props.text,
    class: 'b-pageloader is-active'
  });
}
//# sourceMappingURL=BPageLoader.js.map