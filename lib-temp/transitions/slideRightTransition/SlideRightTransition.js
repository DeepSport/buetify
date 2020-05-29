import './slide-right-transition.sass';
import { h, Transition } from 'vue';
export default function SlideRightTransition(_, { attrs, slots }) {
    return h(Transition, { ...attrs, name: 'slide-right', css: true }, slots.default && slots.default());
}
//# sourceMappingURL=SlideRightTransition.js.map