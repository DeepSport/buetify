<template>
	<section aria-label="b-switch sizes example">
		<div class="field">
			<b-switch size="is-small">
				Small
			</b-switch>
		</div>
		<div class="field">
			<b-switch>
				Default
			</b-switch>
		</div>
		<div class="field">
			<b-switch size="is-medium">
				Medium
			</b-switch>
		</div>
		<div class="field">
			<b-switch size="is-large">
				Large
			</b-switch>
		</div>
	</section>
</template>
<script lang="ts">
import { BSwitch } from 'buetify/lib/components';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'checkbox-sizes-example',
	components: {
		BSwitch
	}
});
</script>
