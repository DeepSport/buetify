<template>
	<section aria-label="select multiple example with object array">
		<p class="content">
			<b>Selected:</b>
			{{ description }}
		</p>
		<b-field label="Select people">
			<b-select
				placeholder="Select multiple people"
				is-multiple
				item-id="id"
				:items="people"
				:item-text="toText"
				:display-count="8"
				v-model="selectedPeople"
			>
			</b-select>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BSelect } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef, computed, reactive } from 'vue';
import { people, Person } from '../../../../shared/data';

export default defineComponent({
	name: 'multiple-select',
	components: {
		BSelect,
		BField
	},
	setup() {
		const selectedPeople = shallowRef<Person[]>([]);

		function toText(person: Person) {
			return `${person.user.firstName} ${person.user.lastName}`;
		}

		const description = computed(() => selectedPeople.value.map(toText).join(', '));

		return {
			people,
			toText,
			description,
			selectedPeople
		};
	}
});
</script>
