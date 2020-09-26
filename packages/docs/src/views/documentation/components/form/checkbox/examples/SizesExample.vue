<template>
	<section aria-label="checkbox sizes example">
		<div class="field">
			<b-checkbox size="is-small">Small</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox>
				Default
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox size="is-medium">
				Medium
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox size="is-large">
				Large
			</b-checkbox>
		</div>
	</section>
</template>
<script lang="ts">
import { BCheckbox } from 'buetify/lib/components';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'checkbox-sizes-example',
	components: {
		BCheckbox
	}
});
</script>
