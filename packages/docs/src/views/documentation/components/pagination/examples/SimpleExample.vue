<template>
	<section aria-label="simple b-pagination example">
		<b-field is-grouped is-grouped-multiline>
			<b-field label="Total">
				<b-input type="number" v-model="total"> </b-input>
			</b-field>
			<b-field label="Items per page">
				<b-input type="number" v-model="itemsPerPage"> </b-input>
			</b-field>
			<b-field is-grouped is-grouped-multiline>
				<b-field label="Position">
					<b-select :items="positions" v-model="position"> </b-select>
				</b-field>
				<b-field label="Size">
					<b-select :items="sizes" v-model="size"> </b-select>
				</b-field>
			</b-field>
			<b-field is-grouped is-grouped-multiline>
				<p class="control">
					<b-switch v-model="isSimple">
						Simple
					</b-switch>
				</p>
				<p class="control">
					<b-switch v-model="isRounded">
						Rounded
					</b-switch>
				</p>
			</b-field>
		</b-field>
		<p class="padding-top-size-6 has-text-centered"><b>Current Page: </b>{{ currentPage }}</p>
		<b-horizontal-divider></b-horizontal-divider>
		<b-pagination
			v-model="currentPage"
			:total="total"
			:per-page="itemsPerPage"
			:position="position"
			:size="size"
			:is-rounded="isRounded"
			:is-simple="isSimple"
		>
		</b-pagination>
	</section>
</template>
<script lang="ts">
import { BInput, BSelect, BSwitch } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import BPagination, { PaginationPosition, PaginationSize } from 'buetify/lib/components/pagination/BPagination';
import { defineComponent, shallowRef } from 'vue';

interface Option<T> {
	value: T;
	text: string;
}

const positions: Option<PaginationPosition>[] = [
	{
		value: 'is-right',
		text: 'Right'
	},
	{
		value: 'is-centered',
		text: 'Center'
	},
	{
		value: '',
		text: 'Default'
	}
];

const sizes: Option<PaginationSize>[] = [
	{
		value: 'is-small',
		text: 'Small'
	},
	{
		value: '',
		text: 'Default'
	},
	{
		value: 'is-medium',
		text: 'Medium'
	},
	{
		value: 'is-large',
		text: 'Large'
	}
];

export default defineComponent({
	name: 'simple-pagination-example',
	components: {
		BPagination,
		BSelect,
		BSwitch,
		BInput,
		BField,
		BHorizontalDivider
	},
	setup() {
		const total = shallowRef(200);
		const itemsPerPage = shallowRef(20);
		const position = shallowRef<PaginationPosition>('');
		const isSimple = shallowRef(false);
		const isRounded = shallowRef(false);
		const size = shallowRef<PaginationSize>('');
		const currentPage = shallowRef(1);

		return {
			total,
			itemsPerPage,
			position,
			isSimple,
			isRounded,
			size,
			sizes,
			positions,
			currentPage
		};
	}
});
</script>
