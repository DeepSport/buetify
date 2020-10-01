<template>
	<section aria-label="b-number-input color variant examples">
		<b-field label="Primary">
			<b-number-input :placeholder="50"></b-number-input>
		</b-field>

		<b-field label="Success">
			<b-number-input variant="is-success"></b-number-input>
		</b-field>

		<b-field label="Danger">
			<b-number-input variant="is-danger"></b-number-input>
		</b-field>

		<b-field label="Info">
			<b-number-input variant="is-info"></b-number-input>
		</b-field>

		<b-field label="Warning">
			<b-number-input variant="is-warning"></b-number-input>
		</b-field>

		<b-field label="Light">
			<b-number-input variant="is-light"></b-number-input>
		</b-field>

		<b-field label="Dark">
			<b-number-input variant="is-dark"></b-number-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import BField from 'buetify/lib/components/form/field';
import BNumberInput from 'buetify/lib/components/form/numberInput/BNumberInput';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'variants-example',
	components: {
		BField,
		BNumberInput
	}
});
</script>
