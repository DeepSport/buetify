<template>
	<section aria-label="b-table with multiple sorting">
		<b-table :rows="rows" :columns="columns" v-model:sort-by="sortBy"> </b-table>
	</section>
</template>
<script lang="ts">
import BTable from 'buetify/lib/components/table/BTable';
import { BTableColumn } from 'buetify/lib/components/table/shared';
import { contramap, ordNumber, ordString } from 'fp-ts/lib/Ord';
import { defineComponent, shallowRef } from 'vue';

interface Person {
	id: number;
	firstName: string;
	lastName: string;
	team: string;
}
interface PeopleTableColumn extends BTableColumn<Person> {}

const rows: Person[] = [
	{ id: 1, firstName: 'Abbie', lastName: 'Archer', team: 'Team B' },
	{ id: 2, firstName: 'Abbie', lastName: 'Smith', team: 'Team A' },
	{ id: 3, firstName: 'Jones', lastName: 'Smith', team: 'Team C' },
	{ id: 4, firstName: 'Abbie', lastName: 'Archer', team: 'Team A' }
];

const FIRST_NAME_COLUMN: PeopleTableColumn = {
	value: 'firstName',
	label: 'First Name',
	sort: {
		ord: contramap<string, Person>(row => row.firstName)(ordString)
	}
};

const columns: PeopleTableColumn[] = [
	{
		value: 'id',
		label: 'ID',
		width: '40',
		sort: {
			ord: contramap<number, Person>(row => row.id)(ordNumber)
		}
	},
	FIRST_NAME_COLUMN,
	{
		value: 'lastName',
		label: 'Last Name',
		sort: {
			ord: contramap<string, Person>(row => row.lastName)(ordString)
		}
	},
	{
		value: 'team',
		label: 'Team',
		sort: {
			ord: contramap<string, Person>(row => row.team)(ordString)
		}
	}
];

export default defineComponent({
	name: 'pagination-and-sorting-table-example',
	components: {
		BTable
	},
	setup() {
		const sortBy = shallowRef([FIRST_NAME_COLUMN]);

		return {
			rows,
			columns,
			sortBy
		};
	}
});
</script>
