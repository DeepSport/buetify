import './icon.sass';
import { isString } from '../../utils/helpers';
import { h } from 'vue';
function convertVariant(variant) {
    if (isString(variant)) {
        return variant.replace('is', 'has-text');
    }
    else {
        const x = {};
        for (const k in variant) {
            const nk = k.replace('is', 'has-text');
            x[nk] = variant[k];
        }
        return x;
    }
}
export default function BIcon(props, { attrs }) {
    return h(props.tag ?? 'span', {
        ...attrs,
        class: ['icon', props.size, { 'is-hoverable': props.isHoverable }, convertVariant(props.variant || '')]
    }, [h(props.icon, { class: props.size })]);
}
//# sourceMappingURL=BIcon.js.map