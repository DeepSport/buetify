import { AllColorsVariant } from '../../../types/ColorVariants';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';
import { VNode, h, SetupContext } from 'vue';
import BField from './BField';

export interface BFieldBodyProps {
  message?: string;
  variant?: AllColorsVariant;
  tag?: string;
}

export default function BFieldBody(props: BFieldBodyProps, { attrs, slots }: SetupContext) {
  const nodes = slots.default!();
  console.log(nodes);
  return h(
    props.tag ?? 'div',
    {
      class: mergeClasses(attrs.class as Classes, 'field-body')
    },
    nodes.map((element: VNode) => (!!element.el ? element : h(BField, props, [element])))
  );
}
