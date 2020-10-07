<template>
	<section aria-label="b-table with checkable rows example">
		<div class="block">
			<b-button variant="is-danger" @click="clear">
				<close-icon></close-icon>
				<span>Clear Selected Rows</span>
			</b-button>
		</div>
		<b-tabs>
			<b-tab-item label="Table">
				<b-table
					is-checkable
					:rows="rows"
					checkbox-variant="is-danger"
					:columns="columns"
					v-model:checked-rows="checkedRows"
				>
				</b-table>
			</b-tab-item>
			<b-tab-item label="Checked">
				<pre>{{ checkedRows }}</pre>
			</b-tab-item>
		</b-tabs>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BTable from 'buetify/lib/components/table/BTable';
import { BTableColumnData } from 'buetify/lib/components/table/shared';
import BTabItem from 'buetify/lib/components/tabs/BTabItem';
import BTabs from 'buetify/lib/components/tabs/BTabs';
import { defineComponent, shallowRef } from 'vue';
import CloseIcon from '../../../../../components/icons/CloseIcon';
import { people, Person } from '../../../shared/data';

const rows: Person[] = people.slice(0, 5);

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
	name: 'checkable-table-example',
	components: {
		BTable,
		BButton,
		CloseIcon,
		BTabs,
		BTabItem
	},
	setup() {
		const checkedRows = shallowRef(rows.slice(0, 1));

		function clear() {
			checkedRows.value = [];
		}

		return {
			clear,
			checkedRows,
			rows,
			columns
		};
	}
});
</script>
