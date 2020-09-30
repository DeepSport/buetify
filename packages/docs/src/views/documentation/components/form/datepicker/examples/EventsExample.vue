<template>
	<section aria-label="simple footpicker example">
		<b-field>
			<b-radio v-model="indicators" true-value="bars">
				Bars
			</b-radio>
			<b-radio v-model="indicators" true-value="dots"> Dots</b-radio>
		</b-field>
		<b-datepicker is-inline :first-day-of-week="1" :events="events" :indicators="indicators" placeholder="Click to select" v-model="selectedDate"> </b-datepicker>
	</section>
</template>
<script lang="ts">
import { BRadio } from 'buetify/lib/components';
import BDatepicker from 'buetify/lib/components/form/datepicker/BDatepicker';
import { DateEvent, EventIndicator } from 'buetify/lib/components/form/datepicker/shared';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef } from 'vue';

const month = new Date().getMonth();

const year = new Date().getFullYear();

const events: DateEvent[] = [
	new Date(year, month, 2),
	new Date(year, month, 6),
	{
		date: new Date(year, month, 6),
		variant: 'is-info'
	},
	{
		date: new Date(year, month, 8),
		variant: 'is-danger'
	},
	{
		date: new Date(year, month, 10),
		variant: 'is-success'
	},
	{
		date: new Date(year, month, 10),
		variant: 'is-link'
	},
	new Date(year, month, 12),
	{
		date: new Date(year, month, 12),
		variant: 'is-warning'
	},
	{
		date: new Date(year, month, 16),
		variant: 'is-danger'
	},
	new Date(year, month, 20),
	{
		date: new Date(year, month, 29),
		variant: 'is-success'
	},
	{
		date: new Date(year, month, 29),
		variant: 'is-warning'
	},
	{
		date: new Date(year, month, 29),
		variant: 'is-info'
	}
];
export default defineComponent({
	name: 'datepicker-events-example',
	components: {
		BDatepicker,
		BRadio,
		BField
	},
	setup() {
		const selectedDate = shallowRef<Date | null>(null);

		const indicators = shallowRef<EventIndicator>('bars');

		return {
			selectedDate,
			indicators,
			events
		};
	}
});
</script>
