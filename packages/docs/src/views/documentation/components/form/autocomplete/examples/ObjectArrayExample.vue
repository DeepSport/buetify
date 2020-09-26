<template>
	<section aria-label="autocomplete example with object array">
		<p class="content"><b>Selected:</b> {{ description }}</p>
		<b-field label="Find a fruit">
			<b-autocomplete
				:items="people"
				placeholder="e.g. Apple"
				:icon="SearchIcon"
				item-id="id"
				:item-text="toText"
				clear-on-select
				v-model:selected-items="selectedPeople"
			>
			</b-autocomplete>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BAutocomplete, BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef, computed, reactive } from 'vue';
import SearchIcon from '../../../../../../components/icons/SearchIcon';
import { people, Person } from '../../../../shared/data';

export default defineComponent({
	name: 'autocomplete-custom-with-object-array',
	components: {
		BAutocomplete,
		BField
	},
	setup() {
		const selectedPeople = shallowRef<Person[]>([]);

		function toText(person: Person) {
			return `${person.user.firstName} ${person.user.lastName}`;
		}

		const description = computed(() => selectedPeople.value.map(toText).join(', '));

		return {
			SearchIcon,
			people,
			toText,
			description,
			selectedPeople
		};
	}
});
</script>
