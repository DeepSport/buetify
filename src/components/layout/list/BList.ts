import { isEmpty } from 'fp-ts/lib/Array';
import { h, SetupContext, ComponentOptions, FunctionalComponent } from 'vue';

export interface BListProps {
  tag?: string | ComponentOptions | FunctionalComponent;
  items: unknown[];
}

export default function BList(props: BListProps, { slots }: SetupContext) {
  if (isEmpty(props.items)) {
    return h(props.tag ?? 'div', slots.empty && slots.empty());
  } else {
    const length = props.items.length;
    const slot = slots.default;
    return (
      slot &&
      h(
        props.tag ?? 'div',
        props.items.map((item, index) =>
          slot({
            item,
            index,
            length,
            isLast: index === length - 1
          })
        )
      )
    );
  }
}
