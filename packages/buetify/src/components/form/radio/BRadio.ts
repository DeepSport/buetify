import './radio.sass';
import { useSelectionControl } from '../shared/useSelectionControl';

export const defineRadio = useSelectionControl('radio', 'radio', 'b-radio', 'b-radio radio');

export const BRadio = defineRadio<any>();
