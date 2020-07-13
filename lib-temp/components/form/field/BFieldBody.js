import { mergeClasses } from '../../../utils/mergeClasses';
import { h } from 'vue';
import BField from './BField';
export default function BFieldBody(props, { attrs, slots }) {
    var _a;
    h((_a = props.tag) !== null && _a !== void 0 ? _a : 'div', {
        class: mergeClasses(attrs.class, 'field-body')
    }, slots.default().map((element) => (!element.el ? undefined : h(BField, props, [element]))));
}
//# sourceMappingURL=BFieldBody.js.map