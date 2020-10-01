<template>
	<section>
		<b-field label="Select a JS framework">
			<b-select placeholder="e.g. Vue" :items="frameworks" v-model="selectedFramework"> </b-select>
		</b-field>

		<b-field label="Error" variant="is-danger" message="Something went wrong with this field">
			<b-select placeholder="Select a character" :items="['Flint', 'Silver']"> </b-select>
		</b-field>

		<b-field label="Rounded">
			<b-select placeholder="Select a character" is-rounded :items="['Flint', 'Silver']"> </b-select>
		</b-field>

		<b-field label="Required">
			<b-select placeholder="Select a character" is-required :items="['Flint', 'Silver']"> </b-select>
		</b-field>

		<b-field label="Loading">
			<b-select placeholder="Select a character" is-loading :items="['Flint', 'Silver']"> </b-select>
		</b-field>

		<b-field label="Disabled">
			<b-select placeholder="Select a character" is-disabled :items="['Flint', 'Silver']"> </b-select>
		</b-field>

		<b-field label="Expanded">
			<b-select placeholder="Select a character" is-expanded :items="['Flint', 'Silver']"> </b-select>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BSelect } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef } from 'vue';

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
	name: 'select-example',
	components: {
		BSelect,
		BField
	},
	setup() {
		const selectedFramework = shallowRef(null);

		return {
			frameworks,
			selectedFramework
		};
	}
});
</script>
