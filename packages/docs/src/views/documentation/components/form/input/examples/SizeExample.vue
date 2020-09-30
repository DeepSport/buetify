<template>
	<section aria-label="b-input sizes examples">
		<b-field>
			<b-input placeholder="Small" size="is-small" :icon="UserIcon"> </b-input>
		</b-field>

		<b-field>
			<b-input placeholder="Default" :icon="UserIcon"> </b-input>
		</b-field>

		<b-field>
			<b-input placeholder="Medium" size="is-medium" :icon="UserIcon"> </b-input>
		</b-field>

		<b-field>
			<b-input placeholder="Large" size="is-large" :icon="UserIcon"> </b-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';
import UserIcon from '../../../../../../components/icons/UserIcon';

export default defineComponent({
	name: 'input-sizes-example',
	components: {
		BField,
		BInput
	},
  setup() {
	  return {
	    UserIcon
    }
  }
});
</script>
