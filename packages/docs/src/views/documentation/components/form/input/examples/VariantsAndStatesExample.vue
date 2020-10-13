<template>
	<section aria-label="variants and states b-input examples">
		<b-field>
			<b-input placeholder="No label"></b-input>
		</b-field>

		<b-field label="Rounded">
			<b-input placeholder="Rounded" is-rounded></b-input>
		</b-field>

		<b-field label="Success" variant="is-success">
			<b-input placeholder="Success"></b-input>
		</b-field>

		<b-field label="Error" variant="is-danger" message="You can have a message too">
			<b-input placeholder="Error"></b-input>
		</b-field>

		<b-field label="Info" variant="is-info">
			<b-input placeholder="Info"></b-input>
		</b-field>

		<b-field label="Warning" variant="is-warning">
			<b-input placeholder="Warning"></b-input>
		</b-field>

		<b-field label="Disabled">
			<b-input placeholder="Disabled" is-disabled></b-input>
		</b-field>

		<b-field label="Loading">
			<b-input placeholder="Loading" is-loading></b-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'field-variants-and-states-example',
	components: {
		BField,
		BInput
	}
});
</script>
