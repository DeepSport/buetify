import './radio.sass';
import { getSelectionControl } from '../shared/getSelectionControl';

export const defineRadio = getSelectionControl('radio', 'radio', 'b-radio', 'b-radio radio');

export const BRadio = defineRadio<any>();
