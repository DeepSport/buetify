import './slide-right-transition.sass';
import { SetupContext, h, Transition } from 'vue';

export default function SlideRightTransition(_: any, { attrs, slots }: SetupContext) {
  return h(Transition, { ...attrs, name: 'slide-right', css: true }, slots.default);
}
