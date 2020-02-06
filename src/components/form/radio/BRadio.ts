import './radio.sass';
import { getSelectionControl } from '../shared/getSelectionControl';

export default getSelectionControl('radio', 'radio', 'BRadio', 'b-radio radio').extend({
	computed: {
		disableOnChange(): boolean {
			return this.isActive;
		}
	}
});
