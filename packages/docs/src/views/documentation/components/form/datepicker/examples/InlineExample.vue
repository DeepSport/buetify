<template>
	<section aria-label="simple datepicker example">
    <p class="content"> Selected Date: {{ selectedDate.toLocaleDateString() }}</p>
    <b-datepicker placeholder="Click to select" is-inline v-model="selectedDate"> </b-datepicker>
	</section>
</template>
<script lang="ts">
import BDatepicker from 'buetify/lib/components/form/datepicker/BDatepicker';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'datepicker-inline-example',
	components: {
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
