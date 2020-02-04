import { isEmpty } from "fp-ts/lib/Array";
import Vue, { PropType, VNode } from "vue";

export default Vue.extend({
  name: "BList",
  functional: true,
  props: {
    tag: {
      type: [String, Function],
      required: false,
      default: "div"
    },
    items: {
      type: Array as PropType<unknown[]>,
      required: true
    }
  },
  render(h, { props, data, slots, scopedSlots }): VNode {
    if (isEmpty(props.items)) {
      const extractedSlots = slots();
      return h(props.tag, data, extractedSlots && extractedSlots.empty);
    } else {
      const length = props.items.length;
      return h(
        props.tag,
        data,
        props.items.map((item, index) =>
          scopedSlots.default({
            item,
            index,
            length,
            isLast: index === length - 1
          })
        )
      );
    }
  }
});
