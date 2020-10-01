<template>
	<section aria-label="b-number-input sizes examples">
		<b-field>
			<b-number-input placeholder="Small" size="is-small"> </b-number-input>
		</b-field>

		<b-field>
			<b-number-input placeholder="Default"> </b-number-input>
		</b-field>

		<b-field>
			<b-number-input placeholder="Medium" size="is-medium"> </b-number-input>
		</b-field>

		<b-field>
			<b-number-input placeholder="Large" size="is-large"> </b-number-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import BNumberInput from 'buetify/lib/components/form/numberInput/BNumberInput';
import { defineComponent } from 'vue';
import UserIcon from '../../../../../../components/icons/UserIcon';

export default defineComponent({
	name: 'size-example',
	components: {
		BField,
		BNumberInput
	},
});
</script>
