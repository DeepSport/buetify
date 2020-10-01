<template>
	<section aria-label="radio sizes example">
		<div class="field">
			<b-radio v-model="size" size="is-small" native-value="small">
				Small
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="size" native-value="default">
				Default
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="size" size="is-medium" native-value="medium">
				Medium
			</b-radio>
		</div>
		<div class="field">
			<b-radio v-model="size" size="is-large" native-value="large">
				Large
			</b-radio>
		</div>
	</section>
</template>
<script lang="ts">
import { BRadio } from 'buetify/lib/components';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'checkbox-sizes-example',
	components: {
		BRadio
	},
	setup() {
		return {
			size: shallowRef('default')
		};
	}
});
</script>
