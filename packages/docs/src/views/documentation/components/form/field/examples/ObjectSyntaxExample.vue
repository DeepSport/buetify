<template>
	<section aria-label="object message syntax example for b-field">
		<b-checkbox v-model="showErrors">Show errors</b-checkbox>

		<b-field label="Username" :variant="variant" :message="{ 'Username is not available': showErrors }">
			<b-input model-value="johnsilver" maxlength="30"></b-input>
		</b-field>

		<b-field
			label="Password"
			:variant="variant"
			:message="[
				{ 'Password is too short': showErrors },
				{ 'Password must have at least 8 characters': showErrors }
			]"
		>
			<b-input model-value="123" type="password" maxlength="30"></b-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BCheckbox, BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent, shallowRef, computed } from 'vue';

export default defineComponent({
	name: 'field-object-syntax-example',
	components: {
		BField,
		BInput,
		BCheckbox
	},
	setup() {
		const showErrors = shallowRef(true);
		const variant = computed(() => (showErrors.value ? 'is-danger' : ''));
		return {
			showErrors,
			variant
		};
	}
});
</script>
