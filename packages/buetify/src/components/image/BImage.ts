import 'bulma/sass/elements/image.sass';
import { Classes } from '../../utils/mergeClasses';
import { h, FunctionalComponent } from 'vue';

export interface BImageProps {
  src: string;
  alt: string;
  isRounded?: boolean;
  imgClass?: Classes;
}

const BImage_: FunctionalComponent<BImageProps> = function BImage(props) {
  return h(
    'figure',
    {
      class: 'image'
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
};

export default BImage_;
