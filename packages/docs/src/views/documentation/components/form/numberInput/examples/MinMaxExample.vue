<template>
	<section aria-label="b-number-input min / max examples">
		<b-field label="Vote">
			<b-number-input :min="0" :max="10" :model-value="5"> </b-number-input>
		</b-field>

		<b-field label="Age">
			<b-number-input :min="18" :model-value="18"> </b-number-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import BField from 'buetify/lib/components/form/field';
import BNumberInput from 'buetify/lib/components/form/numberInput/BNumberInput';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'min-max-example',
	components: {
		BField,
		BNumberInput
	},
	setup() {
		return {
			number: shallowRef(0),
			numberPlaceholder: shallowRef<number | undefined>(undefined)
		};
	}
});
</script>
