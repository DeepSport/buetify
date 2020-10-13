<template>
	<section aria-label="autocomplete example with custom footer">
		<p class="content"><b>Selected:</b> {{ description }}</p>
		<b-field label="Find a fruit">
			<b-autocomplete
				:items="availableFruits"
				placeholder="e.g. Apple"
				:icon="SearchIcon"
				clear-on-select
				v-model:selected-items="selectedFruits"
			>
				<template #footer>
					<button @click="openFruitDialog">
						Add a fruit...
					</button>
				</template>
			</b-autocomplete>
		</b-field>
		<b-dialog v-model:is-active="isActive">
			<template #default>
				<b-field label="New Fruit">
					<b-input type="text" v-model="newFruit" placeholder="e.g. Peach"> </b-input>
				</b-field>
			</template>
			<template #footer="{ close }">
				<b-button variant="is-success" :is-disabled="!newFruit" is-fullwidth @click="addFruit(close)">
					Add Fruit
				</b-button>
			</template>
		</b-dialog>
	</section>
</template>
<script lang="ts">
import { BAutocomplete, BInput } from 'buetify/lib/components';
import BButton from 'buetify/lib/components/button/BButton';
import BDialog from 'buetify/lib/components/dialog/BDialog';
import BField from 'buetify/lib/components/form/field';
import { IO } from 'fp-ts/lib/IO';
import { defineComponent, shallowRef, computed, reactive } from 'vue';
import SearchIcon from '../../../../../../components/icons/SearchIcon';

const fruits = ['Orange', 'Apple', 'Banana', 'Pear', 'Lemon', 'Strawberry', 'Kiwi'];

export default defineComponent({
	name: 'autocomplete-custom-footer-example',
	components: {
		BAutocomplete,
		BField,
		BDialog,
		BButton,
		BInput
	},
	setup() {
		const isActive = shallowRef(false);
		const newFruit = shallowRef('');
		const availableFruits = reactive(fruits);
		const selectedFruits = shallowRef([]);
		const description = computed(() => selectedFruits.value.join(', '));

		function openFruitDialog() {
			isActive.value = true;
		}

		function addFruit(close: IO<void>) {
			const nf = newFruit.value;
			if (nf && !availableFruits.includes(nf)) {
				availableFruits.push(nf);
				newFruit.value = '';
				close();
			}
		}

		return {
			SearchIcon,
			isActive,
			openFruitDialog,
			addFruit,
			newFruit,
			availableFruits,
			selectedFruits,
			description
		};
	}
});
</script>
