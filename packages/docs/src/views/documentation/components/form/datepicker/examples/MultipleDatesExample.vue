<template>
	<section aria-label="multiple dates datepicker example">
		<b-field label="Select multiple dates">
			<b-datepicker placeholder="Click to select" v-model="selectedDates" is-multiple :close-on-select="false">
			</b-datepicker>
		</b-field>
	</section>
</template>
<script lang="ts">
import BDatepicker from 'buetify/lib/components/form/datepicker/BDatepicker';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'datepicker-simple-example',
	components: {
		BField,
		BDatepicker
	},
	setup() {
		const selectedDates = shallowRef([]);

		return {
			selectedDates
		};
	}
});
</script>
