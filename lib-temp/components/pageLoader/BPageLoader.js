import './pageloader.sass';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
export default function BPageLoader(props, { attrs }) {
    attrs.data = mergeClasses(attrs.class, 'b-pageloader is-active');
    attrs['data-content'] = props.text;
    return h('div', attrs);
}
//# sourceMappingURL=BPageLoader.js.map