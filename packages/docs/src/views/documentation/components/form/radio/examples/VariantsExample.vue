<template>
	<section aria-label="radio color variants examples">
		<div class="field">
			<b-radio v-model="radio" native-value="default">
				Default
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="radio" native-value="info" variant="is-info">
				Info
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="radio" native-value="success" variant="is-success">
				Success
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="radio" native-value="danger" variant="is-danger">
				Danger
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="radio" native-value="warning" variant="is-warning">
				Warning
			</b-radio>
		</div>
	</section>
</template>
<script lang="ts">
import { BRadio } from 'buetify/lib/components';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'radio-variants-example',
	components: {
		BRadio
	},
	setup() {
		return {
			radio: shallowRef('default')
		};
	}
});
</script>
