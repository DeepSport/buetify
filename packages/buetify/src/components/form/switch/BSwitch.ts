import '../../../sass/helpers/animations.sass';
import '../sass/form.sass';
import './switch.sass';
import { useSelectionControl } from '../shared/useSelectionControl';

export const defineSwitch = useSelectionControl('switch', 'checkbox', 'b-switch', 'switch');

export const BSwitch = defineSwitch<unknown>();
