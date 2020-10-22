import './checkbox.sass';
import '../sass/form.sass';
import { useSelectionControl } from '../shared/useSelectionControl';

export const defineCheckbox = useSelectionControl('checkbox', 'checkbox', 'b-checkbox', 'b-checkbox checkbox');

export const BCheckbox = defineCheckbox<unknown>();
