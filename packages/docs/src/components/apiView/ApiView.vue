<template>
	<article id="api">
		<router-link to="#api">
			<b-title># API</b-title>
		</router-link>
		<section class="api-view" v-for="api in data" :key="api.title" :id="api.slug">
			<router-link v-if="data.length > 1" :to="api.slug">
				<b-subtitle tag="h1" class="margin-top-size-6"> # {{ api.title }}</b-subtitle>
			</router-link>
			<b-tabs class="margin-top-size-6 api-tabs">
				<b-tab-item v-if="api.props && api.props.length" label="Props">
					<b-styled-table class="is-fullwidth">
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
					</b-styled-table>
				</b-tab-item>
				<b-tab-item v-if="api.slots && api.slots.length" label="Slots">
					<b-styled-table class="is-fullwidth">
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
					</b-styled-table>
				</b-tab-item>
				<b-tab-item v-if="api.events && api.events.length" label="Events">
					<b-styled-table class="is-fullwidth">
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
					</b-styled-table>
				</b-tab-item>
				<b-tab-item v-if="api.methods && api.methods.length" label="Methods">
					<b-styled-table class="is-fullwidth">
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
					</b-styled-table>
				</b-tab-item>
			</b-tabs>
		</section>
	</article>
</template>

<script lang="ts">
import { BStyledTable, BSubtitle, BTabItem, BTabs, BTitle } from 'buetify/lib/components';
import { defineComponent, computed, PropType } from 'vue';
import { toSlug } from '../../shared/composables/useSlug';
import { ComponentApiDescription } from './types';

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
		BStyledTable,
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

<style lang="sass">
.api-view
  .api-tabs
    .tab-content
      padding-left: 0
      padding-right: 0
</style>
