<template>
	<section aria-label="b-fields nested groups example">
		<b-field is-grouped>
			<b-field label="Title">
				<b-select :items="['Mr.', 'Ms.']"></b-select>
			</b-field>
			<b-field label="Name" is-expanded>
				<b-input></b-input>
			</b-field>
			<b-field label="Email" is-expanded>
				<b-input></b-input>
			</b-field>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput, BSelect } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'field-nested-groups-example',
	components: {
		BField,
		BInput,
		BSelect
	}
});
</script>
