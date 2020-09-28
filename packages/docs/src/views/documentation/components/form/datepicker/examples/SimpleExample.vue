<template>
	<section aria-label="simple datepicker example">
		<b-field label="Select a Date:">
      <b-datepicker
          placeholder="Click to select"
          v-model="selectedDate"
      >
      </b-datepicker>
		</b-field>
	</section>
</template>
<script lang="ts">
import BDatepicker from 'buetify/lib/components/form/datepicker/BDatepicker';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'checkbox-simple-example',
	components: {
		BField,
    BDatepicker
	},
	setup() {
		const selectedDate = shallowRef(new Date());

		return {
			selectedDate
		};
	}
});
</script>
