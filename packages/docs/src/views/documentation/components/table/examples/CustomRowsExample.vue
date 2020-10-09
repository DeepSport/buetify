<template>
	<section aria-label="b-table with custom rows example">
		<b-field is-grouped is-grouped-multiline>
			<p class="control">
				<b-switch v-model="isBordered">
					Bordered
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="isStriped">
					Striped
				</b-switch>
			</p>

			<p class="control">
				<b-switch v-model="isNarrow">
					Narrow
				</b-switch>
			</p>

			<p class="control">
				<b-switch v-model="isHoverable">
					Hoverable
				</b-switch>
			</p>

			<p class="control">
				<b-switch v-model="isLoading">
					Loading
				</b-switch>
			</p>

			<p class="control">
				<b-switch v-model="isEmpty">
					Empty
				</b-switch>
			</p>

			<p class="control">
				<b-switch v-model="useMobileCards">
					Mobile Cards (collapsed rows on mobile)
				</b-switch>
			</p>
		</b-field>
		<b-table
			:rows="rows"
			:columns="columns"
			:is-bordered="isBordered"
			:is-striped="isStriped"
			:is-narrow="isNarrow"
			:is-hoverable="isHoverable"
			:is-loading="isLoading"
			:use-mobile-cards="useMobileCards"
		>
			<template #row="{ row, columns }">
				<tr>
					<td :data-label="columns[0].label">
						{{ row.id }}
					</td>
					<td :data-label="columns[1].label">
						{{ row.user.firstName }}
					</td>
					<td :data-label="columns[2].label">
						{{ row.user.lastName }}
					</td>
					<td :data-label="columns[3].label" class="has-text-centered">
						<b-tag variant="is-success">{{ row.date }}</b-tag>
					</td>
					<td :data-label="columns[4].label">
						<div>
							<male-icon v-if="row.gender === 'Male'"></male-icon>
							<female-icon v-else></female-icon>
							<span>{{ row.gender }}</span>
						</div>
					</td>
				</tr>
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
import { BSwitch } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import BTable from 'buetify/lib/components/table/BTable';
import { BTableColumn } from 'buetify/lib/components/table/shared';
import BTag from 'buetify/lib/components/tag/BTag';
import { defineComponent, shallowRef, computed } from 'vue';
import FemaleIcon from '../../../../../components/icons/FemaleIcon';
import MaleIcon from '../../../../../components/icons/MaleIcon';
import { people, Person } from '../../../shared/data';

const rows: Person[] = people.slice(0, 5);

interface PeopleTableColumn extends BTableColumn<Person> {}

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
	name: 'custom-rows-table-example',
	components: {
		BField,
		BSwitch,
		BTable,
		BTag,
		MaleIcon,
		FemaleIcon
	},
	setup() {
		const isBordered = shallowRef(false);
		const isStriped = shallowRef(false);
		const isNarrow = shallowRef(false);
		const isHoverable = shallowRef(false);
		const isLoading = shallowRef(false);
		const isEmpty = shallowRef(false);
		const useMobileCards = shallowRef(false);

		const newRows = computed(() => (isEmpty.value ? [] : rows));

		return {
			rows: newRows,
			columns,
			isBordered,
			isStriped,
			isNarrow,
			isHoverable,
			isLoading,
			isEmpty,
			useMobileCards
		};
	}
});
</script>
