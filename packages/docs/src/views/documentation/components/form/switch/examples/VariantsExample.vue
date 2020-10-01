<template>
	<section aria-label="b-switch color variants examples">
		<div class="field">
			<b-switch :model-value="true">
				Default
			</b-switch>
		</div>
		<div class="field">
			<b-switch :model-value="true" variant="is-info">
				Info
			</b-switch>
		</div>
		<div class="field">
			<b-switch :model-value="true" variant="is-success">
				Success
			</b-switch>
		</div>
		<div class="field">
			<b-switch :model-value="true" variant="is-danger">
				Danger
			</b-switch>
		</div>
		<div class="field">
			<b-switch :model-value="true" variant="is-warning">
				Warning
			</b-switch>
		</div>
	</section>
</template>
<script lang="ts">
import { BSwitch } from 'buetify/lib/components';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'switch-variants-example',
	components: {
		BSwitch
	}
});
</script>
