import '../../sass/helpers/animations.sass';
import { TransitionGroupProps } from 'vue';
import { createJavascriptTransitionGroup } from '../shared/createJavascriptTransition';
import { createExpandTransition } from '../shared/expandTransition';

export default createJavascriptTransitionGroup(
  'vertical-expand-transition',
  createExpandTransition('expand-vertical-transition') as TransitionGroupProps
);
