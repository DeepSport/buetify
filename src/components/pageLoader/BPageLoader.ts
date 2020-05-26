import './pageloader.sass';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { SetupContext, h } from 'vue';

export default function BPageLoader(props: { text: string }, { attrs }: SetupContext) {
  attrs.data = mergeClasses(attrs.class as Classes, 'b-pageloader is-active');
  attrs['data-content'] = props.text;
  return h('div', attrs);
}
