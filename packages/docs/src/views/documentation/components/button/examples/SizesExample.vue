<template>
	<section aria-label="examples of available size variants for b-button component" class="buttons">
		<b-button size="is-small">Small</b-button>
		<b-button>Default</b-button>
		<b-button size="is-medium">Medium</b-button>
		<b-button size="is-large">Large</b-button>
	</section></template
>
<script lang="ts">
import { BButton } from 'buetify/lib/components';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'button-sizes-example',
	components: {
		BButton
	}
});
</script>
