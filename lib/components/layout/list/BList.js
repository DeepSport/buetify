import { isEmpty } from 'fp-ts/lib/Array';
import { h } from 'vue';
export default function BList(props, {
  attrs,
  slots
}) {
  var _a, _b;

  if (isEmpty(props.items)) {
    return h((_a = props.tag) !== null && _a !== void 0 ? _a : 'div', attrs, slots.empty && slots.empty());
  } else {
    const length = props.items.length;
    return h((_b = props.tag) !== null && _b !== void 0 ? _b : 'div', attrs, props.items.map((item, index) => slots.default({
      item,
      index,
      length,
      isLast: index === length - 1
    })));
  }
}
//# sourceMappingURL=BList.js.map