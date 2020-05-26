import './switch.scss';
import { getSelectionControl } from '../shared/getSelectionControl';

export const defineSwitch = getSelectionControl('switch', 'checkbox', 'b-switch', 'switch');

export const BSwitch = defineSwitch<any>();
