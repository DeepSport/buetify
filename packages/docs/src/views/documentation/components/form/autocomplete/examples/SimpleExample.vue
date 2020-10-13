<template>
	<section>
		<p class="content"><b>Selected:</b> {{ description }}</p>
		<b-field label="Find a JS framework">
			<b-autocomplete
				is-rounded
				:items="frameworks"
				placeholder="e.g. Vue"
				:icon="SearchIcon"
				clear-on-select
				v-model:selected-items="selectedFrameworks"
			>
				<template #empty="{ searchValue }">No results found for {{ searchValue }}</template>
			</b-autocomplete>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BAutocomplete } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef, computed } from 'vue';
import SearchIcon from '../../../../../../components/icons/SearchIcon';

const frameworks = [
	'Angular',
	'Angular 2',
	'Aurelia',
	'Backbone',
	'Ember',
	'jQuery',
	'Meteor',
	'Node.js',
	'Polymer',
	'React',
	'RxJS',
	'Vue.js'
];

export default defineComponent({
	name: 'autocomplete-example',
	components: {
		BAutocomplete,
		BField
	},
	setup() {
		const selectedFrameworks = shallowRef([]);
		const description = computed(() => selectedFrameworks.value.join(', '));

		return {
			SearchIcon,
			frameworks,
			selectedFrameworks,
			description
		};
	}
});
</script>
