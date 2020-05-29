import './tag.sass';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
export default function BTagList(props, { attrs, slots }) {
    attrs.class = mergeClasses(attrs.class, ['tags', { 'has-addons': !!props.isAttached }]);
    return h(props.tag ?? 'div', attrs, slots.default());
}
//# sourceMappingURL=BTagList.js.map