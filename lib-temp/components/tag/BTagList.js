import './tag.sass';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
export default function BTagList(props, { attrs, slots }) {
    var _a;
    attrs.class = mergeClasses(attrs.class, ['tags', { 'has-addons': !!props.isAttached }]);
    return h((_a = props.tag) !== null && _a !== void 0 ? _a : 'div', attrs, slots.default());
}
//# sourceMappingURL=BTagList.js.map