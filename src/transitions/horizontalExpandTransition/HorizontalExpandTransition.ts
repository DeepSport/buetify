import '../../sass/helpers/animations.sass';
import { createJavascriptTransition } from './shared/createJavascriptTransition';
import { createExpandTransition } from './shared/expandTransition';

export const HorizontalExpandTransition = createJavascriptTransition(
  'is-horizontal-expand-transition',
  createExpandTransition('expand-horizontal-transition', true)
);
