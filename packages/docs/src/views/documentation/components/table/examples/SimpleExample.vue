<template>
	<section aria-label="simple b-table example">
		<b-table :rows="rows" :columns="columns"> </b-table>
	</section>
</template>
<script lang="ts">
import BTable from 'buetify/lib/components/table/BTable';
import { BTableColumnData } from 'buetify/lib/components/table/shared';
import { defineComponent, shallowRef } from 'vue';
import { people, Person } from '../../../shared/data';


const rows: Person[] = people.slice(0, 5)

interface PeopleTableColumn extends BTableColumnData<Person> {}

const columns: PeopleTableColumn[] = [
	{
		value: 'id',
		label: 'ID',
		width: '40'
	},
	{
		value: row => row.user.firstName,
		label: 'First Name'
	},
	{
		value: row => row.user.lastName,
		label: 'Last Name'
	},
	{
		value: 'date',
		label: 'Date',
		position: 'is-centered'
	},
	{
		value: 'gender',
		label: 'Gender'
	}
];

export default defineComponent({
	name: 'simple-table-example',
	components: {
		BTable
	},
	setup() {
		return {
			rows,
			columns
		};
	}
});
</script>
