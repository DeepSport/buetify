<template>
	<section aria-label="select example with object array">
		<b-field label="Select a person">
			<b-select
				placeholder="e.g. Apple"
				:items="people"
				:icon="SearchIcon"
				item-id="id"
				:item-text="toText"
				v-model="selected"
			>
			</b-select>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BSelect } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef, computed, reactive } from 'vue';
import SearchIcon from '../../../../../../components/icons/SearchIcon';
import { people, Person } from '../../../../shared/data';

export default defineComponent({
	name: 'select-custom-with-object-array',
	components: {
		BSelect,
		BField
	},
	setup() {
		const selected = shallowRef<Person | null>(null);

		function toText(person: Person) {
			return `${person.user.firstName} ${person.user.lastName}`;
		}

		return {
			SearchIcon,
			people,
			toText,
			selected
		};
	}
});
</script>
