import './slide-right-transition.sass';
import { h, Transition, FunctionalComponent } from 'vue';

const SlideRightTransition: FunctionalComponent = (_: unknown, { slots }) => {
  return h(Transition, { name: 'slide-right', css: true }, slots.default);
}

export default SlideRightTransition
