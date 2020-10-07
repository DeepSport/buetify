<template>
	<article>
		<example-view :code="SimpleExampleCode">
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Custom Row Template" :code="CustomRowsExampleCode">
			<template #content>
				<div class="content">
					<p>You can use the <code>row</code> slot to override the default <code>BTableRow</code>.</p>
					<p>
						<b>Note: </b>This will override all the functionality <code>BTable</code> includes: mobile
						cards, drag / drop handlers, selection styling, check boxes, etc.
					</p>
					<p>If you only want to override <code>BTable</code> for a single cell, see the next example.</p>
				</div>
			</template>
			<template #component>
				<custom-rows-example></custom-rows-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Custom Cells Template" :code="CustomCellsExampleCode">
			<template #content>
				<div class="content">
					<p>
						If you look closely at the previous example, you will notice that we actually only override
						<code>BTable</code> in the <code>gender</code> and <code>date</code> columns. Instead of
						overriding the entire row with the <code>row</code> slot, we can add a <code>slotName</code> to
						the column data for these two columns and use the corresponding slots.
					</p>
					<p>
						<b>Note: </b> Since this is still using the default <code>BTableRow</code> component, we still
						get all the built-in checkbox, drag / drop handlers, and selection controls.
					</p>
				</div>
			</template>
			<template #component>
				<custom-cells-example></custom-cells-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Selection" :code="SelectionExampleCode">
			<template #content>
				You can show selected rows by passing an array of selected rows to the <code>selected-rows</code> prop.
				Note that you can make this a two-way binding with <code>v-model:selected-rows</code>
			</template>
			<template #component>
				<selection-example></selection-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Checkable" :code="CheckableExampleCode">
			<template #content>
				<p>You can add checkboxes to rows by using the <code>is-checkable</code> prop.</p>
				<p>
					To show which rows are <b>checked</b>, you must pass an array of checked rows to the
					<code>checked-rows</code> prop. Note you can add the <code>v-model</code> modifier to make it a two
					way binding.
				</p>
				You can show selected rows by passing an array of selected rows to the <code>selected-rows</code> prop.
				Note that you can make this a two-way binding with <code>v-model:selected-rows</code>
			</template>
			<template #component>
				<checkable-example></checkable-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Pagination and Sorting" :code="PaginationAndSortingExampleCode">
			<template #content>
				<p>
					To make a column sortable, provide an <code>Ord</code> instance in the <code>ord</code> field for
					the column. An
					<a target="blank" href="https://github.com/gcanti/fp-ts/blob/master/src/Ord.ts"><code>Ord</code></a>
					is simply an object with a single compare field that can provide a total ordering for two objects of
					the same type.
					<b>Note: </b> You are in no way required to use <code>fp-ts</code> to utilize sorting in a
					<code>BTable</code>. Just provide your own <code>Ord</code> instance.
				</p>
			</template>
			<template #component>
				<pagination-and-sorting-example></pagination-and-sorting-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<api-view :apis="apis"> </api-view>
	</article>
</template>

<script lang="ts">
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import { defineComponent } from 'vue';
import { ApiView } from '../../../../components/apiView';
import ExampleView from '../../../../components/exampleView/ExampleView.vue';
import { apis } from './apis';
import CheckableExample from './examples/CheckableExample.vue';
import CheckableExampleCode from '!!raw-loader!./examples/CheckableExample.vue';
import CustomCellsExample from './examples/CustomCellsExample.vue';
import CustomCellsExampleCode from '!!raw-loader!./examples/CustomCellsExample.vue';
import CustomRowsExample from './examples/CustomRowsExample.vue';
import CustomRowsExampleCode from '!!raw-loader!./examples/CustomRowsExample.vue';
import PaginationAndSortingExample from './examples/PaginationAndSortingExample.vue';
import PaginationAndSortingExampleCode from '!!raw-loader!./examples/PaginationAndSortingExample.vue';
import SelectionExample from './examples/SelectionExample.vue';
import SelectionExampleCode from '!!raw-loader!./examples/SelectionExample.vue';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleExampleCode from '!!raw-loader!./examples/SimpleExample.vue';

export default defineComponent({
	name: 'table-documentation',
	components: {
		ExampleView,
		ApiView,
		SimpleExample,
		BHorizontalDivider,
		CustomRowsExample,
		CustomCellsExample,
		SelectionExample,
		CheckableExample,
		PaginationAndSortingExample
	},
	setup() {
		return {
			apis,
			SimpleExampleCode,
			PaginationAndSortingExampleCode,
			CheckableExampleCode,
			CustomCellsExampleCode,
			CustomRowsExampleCode,
			SelectionExampleCode
		};
	}
});
</script>
