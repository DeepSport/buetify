<template>
	<section aria-label="checkbox sizes example">
		<div class="field">
			<b-checkbox :model-value="true">Primary</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox variant="is-link" :model-value="true">
				Link
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox variant="is-danger" :model-value="true">
				Danger
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox variant="is-warning" :model-value="true">
				Warning
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox variant="is-success" :model-value="true">
				Success
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox variant="is-info" :model-value="true">
				Info
			</b-checkbox>
		</div>
	</section>
</template>
<script lang="ts">
import { BCheckbox } from 'buetify/lib/components';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'checkbox-variants-example',
	components: {
		BCheckbox
	}
});
</script>
