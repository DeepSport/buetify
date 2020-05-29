import { isEmpty } from 'fp-ts/lib/Array';
import { h } from 'vue';
export default function BList(props, { attrs, slots }) {
    if (isEmpty(props.items)) {
        return h(props.tag ?? 'div', attrs, slots.empty && slots.empty());
    }
    else {
        const length = props.items.length;
        return h(props.tag ?? 'div', attrs, props.items.map((item, index) => slots.default({
            item,
            index,
            length,
            isLast: index === length - 1
        })));
    }
}
//# sourceMappingURL=BList.js.map