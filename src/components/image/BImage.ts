import 'bulma/sass/elements/image.sass';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { SetupContext, h } from 'vue';

export interface BImageProps {
  src: string;
  alt: string;
  isRounded?: boolean;
  imgClass?: Classes;
}

export default function BImage(props: BImageProps, { attrs, slots }: SetupContext) {
  return h(
    'figure',
    {
      ...attrs,
      class: mergeClasses(attrs.class as Classes, 'image')
    },
    [
      h('img', {
        class: [
          props.imgClass,
          {
            'is-rounded': props.isRounded
          }
        ],
        src: props.src,
        alt: props.alt
      })
    ]
  );
}
