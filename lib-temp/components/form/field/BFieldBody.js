import { mergeClasses } from '../../../utils/mergeClasses';
import { h } from 'vue';
import BField from './BField';
export default function BFieldBody(props, { attrs, slots }) {
    h(props.tag ?? 'div', {
        class: mergeClasses(attrs.class, 'field-body')
    }, slots.default().map((element) => !element.el ? undefined : h(BField, props, [element])));
}
//# sourceMappingURL=BFieldBody.js.map