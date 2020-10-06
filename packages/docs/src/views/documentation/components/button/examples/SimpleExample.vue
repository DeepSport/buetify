<template>
	<section aria-label="button example with toast" class="buttons">
		<b-button @click="onClick">Click me!</b-button>
	</section>
</template>
<script lang="ts">
import { BButton } from 'buetify/lib/components';
import { useToast } from 'buetify/lib/composables';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'button-toast-example',
	components: {
		BButton
	},
	setup() {
		const { open } = useToast();

		function onClick() {
			open({
				message: 'Toast!!!',
				variant: 'is-success'
			});
		}
		return {
			onClick
		};
	}
});
</script>
