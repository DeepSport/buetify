<template>
	<section aria-label="b-table with custom cells example">
		<b-table :rows="rows" pagination :columns="columns" :sort-column="sortColumn">
			<template #date="{ value }">
				<b-tag variant="is-success">{{ value }}</b-tag>
			</template>
			<template #gender="{ value }">
				<div>
					<male-icon v-if="value === 'Male'"></male-icon>
					<female-icon v-else></female-icon>
					<span>{{ value }}</span>
				</div>
			</template>
			<template #empty>
				<p class="has-text-centered">
					The table is empty
				</p>
			</template>
		</b-table>
	</section>
</template>
<script lang="ts">
import BTable from 'buetify/lib/components/table/BTable';
import { BTableColumnData } from 'buetify/lib/components/table/shared';
import BTag from 'buetify/lib/components/tag/BTag';
import { contramap, ordDate, ordNumber, ordString } from 'fp-ts/lib/Ord';
import { defineComponent, shallowRef, computed } from 'vue';
import FemaleIcon from '../../../../../components/icons/FemaleIcon';
import MaleIcon from '../../../../../components/icons/MaleIcon';
import { people, Person } from '../../../shared/data';

interface PeopleTableColumn extends BTableColumnData<Person> {}

const FIRST_NAME_COLUMN: PeopleTableColumn = {
	value: row => row.user.firstName,
	label: 'First Name',
	ord: contramap<string, Person>(row => row.user.firstName)(ordString)
};

const columns: PeopleTableColumn[] = [
	{
		value: 'id',
		label: 'ID',
		width: '40',
		ord: contramap<number, Person>(row => row.id)(ordNumber)
	},
	FIRST_NAME_COLUMN,
	{
		value: row => row.user.lastName,
		label: 'Last Name',
		ord: contramap<string, Person>(row => row.user.lastName)(ordString)
	},
	{
		value: 'date',
		label: 'Date',
		slotName: 'date',
		position: 'is-centered',
		ord: contramap<Date, Person>(row => new Date(row.date))(ordDate)
	},
	{
		value: 'gender',
		slotName: 'gender',
		label: 'Gender'
	}
];

export default defineComponent({
	name: 'custom-rows-table-example',
	components: {
		BTable,
		BTag,
		MaleIcon,
		FemaleIcon
	},
	setup() {
		const sortColumn = shallowRef(FIRST_NAME_COLUMN);

		return {
			rows: people,
			columns,
			sortColumn
		};
	}
});
</script>
