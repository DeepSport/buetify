import './slide-right-transition.sass';
import { SetupContext, h, Transition } from 'vue';

export default function SlideRightTransition(_: unknown, { slots }: SetupContext) {
  return h(Transition, { name: 'slide-right', css: true }, slots.default);
}
