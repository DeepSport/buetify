<template>
	<section aria-label="b-table with pagination and sorting">
		<b-field is-grouped is-grouped-multiline>
			<b-field label="Sort Direction">
				<b-select v-model="sortDirection" :items="sortTypes"> </b-select>
			</b-field>
			<b-field label="Per Page">
				<b-select v-model="perPage" :items="perPageOptions"> </b-select>
			</b-field>
			<b-field label="Vertical Pagination Position">
				<b-select v-model="verticalPosition" :items="paginationVerticalPositions"> </b-select>
			</b-field>
			<b-field label="Horizontal Pagination Position">
				<b-select v-model="horizontalPosition" :items="paginationHorizontalPositions"> </b-select>
			</b-field>
		</b-field>
		<b-field is-grouped is-grouped-multiline class="padding-top-size-6">
			<p class="control">
				<b-switch v-model="isPaginated">
					Paginated
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="isSimple">
					Simple
				</b-switch>
			</p>
		</b-field>
		<b-table
			:rows="rows"
			:columns="columns"
			:pagination="pagination"
			v-model:sort-type="sortDirection"
			v-model:sort-by="sortBy"
		>
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
		</b-table>
	</section>
</template>
<script lang="ts">
import { BField, BSelect, BSwitch } from 'buetify/lib/components';
import {PaginationPosition, PaginationVerticalPosition} from 'buetify/lib/components/pagination/BPagination';
import BTable, { BTablePaginationInput } from 'buetify/lib/components/table/BTable';
import { BTableColumn, SortType } from 'buetify/lib/components/table/shared';
import BTag from 'buetify/lib/components/tag/BTag';
import { contramap, ordDate, ordNumber, ordString } from 'fp-ts/lib/Ord';
import { defineComponent, shallowRef, computed } from 'vue';
import FemaleIcon from '../../../../../components/icons/FemaleIcon';
import MaleIcon from '../../../../../components/icons/MaleIcon';
import { people, Person } from '../../../shared/data';

interface Option<T> {
	value: T;
	text: string;
}

interface PeopleTableColumn extends BTableColumn<Person> {}

const FIRST_NAME_COLUMN: PeopleTableColumn = {
	value: row => row.user.firstName,
	label: 'First Name',
	sort: {
		ord: contramap<string, Person>(row => row.user.firstName)(ordString)
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
		value: row => row.user.lastName,
		label: 'Last Name',
		sort: {
			ord: contramap<string, Person>(row => row.user.lastName)(ordString)
		}
	},
	{
		value: 'date',
		label: 'Date',
		slotName: 'date',
		position: 'is-centered',
		sort: {
			ord: contramap<Date, Person>(row => new Date(row.date))(ordDate)
		}
	},
	{
		value: 'gender',
		slotName: 'gender',
		label: 'Gender'
	}
];

const sortTypes: SortType[] = ['Ascending', 'Descending'];

const perPageOptions: Option<number>[] = [
	{
		value: 5,
		text: '5 per page'
	},
	{
		value: 10,
		text: '10 per page'
	},
	{
		value: 15,
		text: '15 per page'
	},
	{
		value: 20,
		text: '20 per page'
	}
];

const paginationVerticalPositions: Option<PaginationVerticalPosition>[] = [
	{
		value: 'is-top',
		text: 'Top'
	},
	{
		value: '',
		text: 'Default (Bottom)'
	}
];

const paginationHorizontalPositions: Option<PaginationPosition>[] = [
	{
		value: '',
		text: 'Left (Default)'
	},
	{
		value: 'is-centered',
		text: 'Centered'
	},
	{
		value: 'is-right',
		text: 'Right'
	}
];

export default defineComponent({
	name: 'pagination-and-sorting-table-example',
	components: {
		BField,
		BSelect,
		BSwitch,
		BTable,
		BTag,
		MaleIcon,
		FemaleIcon
	},
	setup() {
		const sortBy = shallowRef(FIRST_NAME_COLUMN);
		const sortDirection = shallowRef<SortType>('Ascending');
		const perPage = shallowRef(5);
		const isSimple = shallowRef(false);
		const isPaginated = shallowRef(true);
		const verticalPosition = shallowRef<PaginationVerticalPosition>('');
		const horizontalPosition = shallowRef<PaginationPosition>('');

		const pagination = computed<BTablePaginationInput | undefined>(() =>
			isPaginated.value
				? {
						perPage: perPage.value,
						isSimple: isSimple.value,
						verticalPosition: verticalPosition.value,
						horizontalPosition: horizontalPosition.value
				  }
				: undefined
		);

		return {
			rows: people,
			columns,
			sortBy,
			sortDirection,
			perPage,
			isSimple,
			isPaginated,
			verticalPosition,
			horizontalPosition,
			perPageOptions,
			paginationVerticalPositions,
			paginationHorizontalPositions,
			pagination,
			sortTypes
		};
	}
});
</script>
