<template>
	<section aria-label="simple footpicker example">
		<b-datepicker placeholder="Click to select" v-model="selectedDate">
			<template #footer>
				<b-field is-grouped>
					<p class="control">
						<b-button class="is-primary" @click="setToday">
							Today
						</b-button>
					</p>
					<p class="control">
						<b-button class="is-danger" @click="clear">
							Clear
						</b-button>
					</p>
				</b-field>
			</template>
		</b-datepicker>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BDatepicker from 'buetify/lib/components/form/datepicker/BDatepicker';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'datepicker-footer-example',
	components: {
		BDatepicker,
		BButton,
		BField
	},
	setup() {
		const selectedDate = shallowRef<Date | null>(null);

		function setToday() {
			selectedDate.value = new Date();
		}

		function clear() {
			selectedDate.value = null;
		}

		return {
			setToday,
			clear,
			selectedDate
		};
	}
});
</script>
