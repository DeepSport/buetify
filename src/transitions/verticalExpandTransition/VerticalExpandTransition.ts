import '../../sass/helpers/animations.sass';
import { createJavascriptTransition } from '../shared/createJavascriptTransition';
import { createExpandTransition } from '../shared/expandTransition';

export default createJavascriptTransition(
	'vertical-expand-transition',
	createExpandTransition('expand-vertical-transition')
);
