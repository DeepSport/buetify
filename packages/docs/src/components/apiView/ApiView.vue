<template>
	<article id="api">
		<router-link to="#api">
			<b-title># API</b-title>
		</router-link>
		<section v-for="api in data" :key="api.title" :id="api.slug">
			<router-link v-if="data.length > 1" :to="api.slug">
				<b-subtitle tag="h1" class="margin-top-size-6"> # {{ api.title }}</b-subtitle>
			</router-link>
			<b-tabs class="margin-top-size-6">

				<b-tab-item v-if="api.props && api.props.length" label="Props">
					<b-simple-table>
						<thead>
							<tr>
								<th v-for="column in PropColumns" :key="column.label">{{ column.label }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="prop in api.props" :key="prop.name">
								<td
									v-for="column in PropColumns"
									:key="column.name"
									v-html="prop[column.field] || '-'"
								></td>
							</tr>
						</tbody>
					</b-simple-table>
				</b-tab-item>
				<b-tab-item v-if="api.slots && api.slots.length" label="Slots">
					<b-simple-table>
						<thead>
							<tr>
								<th v-for="column in SlotColumns" :key="column.name">{{ column.label }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="slot in api.slots" :key="slot.name">
								<td
									v-for="column in SlotColumns"
									:key="column.label"
									v-html="slot[column.field] || '-'"
								></td>
							</tr>
						</tbody>
					</b-simple-table>
				</b-tab-item>
				<b-tab-item v-if="api.events && api.events.length" label="Events">
					<b-simple-table>
						<thead>
							<tr>
								<th v-for="column in EventsColumns" :key="column.name" v-text="column.label"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="prop in api.events" :key="prop.name">
								<td
									v-for="column in EventsColumns"
									:key="column.label"
									v-html="prop[column.field] || '-'"
								></td>
							</tr>
						</tbody>
					</b-simple-table>
				</b-tab-item>
				<b-tab-item v-if="api.methods && api.methods.length" label="Methods">
					<b-simple-table>
						<thead>
							<tr>
								<th v-for="column in MethodsColumns" :key="column.name" v-text="column.name"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="prop in api.methods" :key="prop.name">
								<td
									v-for="column in MethodsColumns"
									:key="column.name"
									v-html="prop[column.field] || '-'"
								></td>
							</tr>
						</tbody>
					</b-simple-table>
				</b-tab-item>
			</b-tabs>
		</section>
	</article>
</template>

<script lang="ts">
import { BSimpleTable, BSubtitle, BTabItem, BTabs, BTitle } from 'buetify/lib/components';
import { BTableColumnData, BTableRow } from 'buetify/lib/components/table/shared';
import { defineComponent, computed, PropType } from 'vue';
import { toSlug, useSlug } from '../../shared/composables/useSlug';
import { ComponentApiDescription, PropApiDescription } from './types';

interface Column {
	label: string;
	field: string;
}

const PropColumns: Column[] = [
	{ label: 'Name', field: 'name' },
	{ label: 'Description', field: 'description' },
	{ label: 'Type', field: 'type' },
	{ label: 'Required', field: 'required' },
	{ label: 'Values', field: 'values' },
	{ label: 'Default', field: 'default' }
];

const SlotColumns: Column[] = [
	{ label: 'Slot name', field: 'name' },
	{ label: 'Description', field: 'description' },
	{ label: 'Props', field: 'props' }
];

const EventsColumns: Column[] = [
	{ label: 'Name', field: 'name' },
	{ label: 'Description', field: 'description' },
	{ label: 'Parameters', field: 'parameters' }
];

const MethodsColumns: Column[] = [
	{ label: 'Name', field: 'name' },
	{ label: 'Description', field: 'description' },
	{ label: 'Parameters', field: 'parameters' },
	{ label: 'Return', field: 'return' }
];
export default defineComponent({
	name: 'api-view',
	components: {
		BSimpleTable,
		BTitle,
		BSubtitle,
		BTabs,
		BTabItem
	},
	props: {
		apis: {
			type: Array as PropType<ComponentApiDescription[]>,
			required: true
		}
	},
	setup(props) {
		return {
			PropColumns,
			SlotColumns,
			EventsColumns,
			MethodsColumns,
			data: computed(() => props.apis.map(api => ({ ...api, slug: toSlug(api.title) })))
		};
	}
});
</script>
