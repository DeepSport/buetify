import './tag.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { h, SetupContext } from 'vue';

export interface BTagProps {
  isAttached?: boolean;
  isClosable?: boolean;
  variant?: ColorVariant;
  size?: SizeVariant;
  isRounded?: boolean;
  isDisabled?: boolean;
  hasEllipsis?: boolean;
  isTabable?: boolean;
  tag?: string;
  onClose?: FunctionN<[MouseEvent], void>;
}

export default function BTag(props: BTagProps, { attrs, slots }: SetupContext) {
  if (!!props.isClosable) {
    attrs.class = mergeClasses(attrs.class as Classes, 'tags has-addons');
    return h(props.tag ?? 'span', attrs, [
      h(
        'span',
        {
          class: ['tag', props.variant, props.size, { 'is-rounded': !!props.isRounded }]
        },
        [h('span', { class: { 'has-ellipsis': !!props.hasEllipsis } }, slots.default && slots.default())]
      ),
      h('button', {
        class: [
          'clear-default-styles tag is-delete has-cursor-pointer',
          props.size,
          { 'is-rounded': !!props.isRounded }
        ],
        type: 'button',
        tabindex: !!props.isTabable ? 0 : false,
        disabled: !!props.isDisabled,
        onClick: !!props.isDisabled ? undefined : props.onClose
      })
    ]);
  } else {
    return h(
      props.tag ?? 'span',
      {
        ...attrs,
        class: mergeClasses(attrs.class as Classes, [
          'tag',
          props.variant,
          props.size,
          { 'is-rounded': !!props.isRounded }
        ])
      },
      [
        h('span', { class: { 'has-ellipsis': !!props.hasEllipsis } }, slots.default && slots.default()),
        ...(!!props.isClosable
          ? [
              h('button', {
                class: [
                  'clear-default-styles tag is-delete has-cursor-pointer',
                  props.size,
                  { 'is-rounded': !!props.isRounded }
                ],
                type: 'button',
                tabIndex: props.isTabable ? 0 : false,
                disabled: !!props.isDisabled,
                onClick: !!props.isDisabled ? undefined : props.onClose
              })
            ]
          : [])
      ]
    );
  }
}
