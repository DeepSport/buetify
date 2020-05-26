import { AllColorsVariant } from '../../../types/ColorVariants';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';
import { VNode, h, SetupContext} from 'vue';
import BField from './BField';

export interface BFieldBodyProps {
  message?: string;
  variant?: AllColorsVariant | { [K in AllColorsVariant]: boolean };
  tag?: string;
}

export default function BFieldBody(props: BFieldBodyProps, { attrs, slots }: SetupContext) {
  h(props.tag ?? 'div', {
    class: mergeClasses(attrs.class as Classes, 'field-body')
  }, slots.default!().map((element: VNode) => !element.el ? undefined : h(BField, props, [element]))
  )
}
