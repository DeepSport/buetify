<template>
	<section aria-label="programmatic b-toast examples" class="buttons">
		<b-button @click="launch">
			Launch Default Toast
		</b-button>
		<b-button @click="success" variant="is-success">
			Launch Success Toast
		</b-button>
		<b-button @click="danger" variant="is-danger">
			Launch Danger Toast
		</b-button>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import { useToast } from 'buetify/lib/composables';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'template-toast-example',
	components: {
		BButton
	},
	setup() {
		const toast = useToast();

		function launch() {
			toast.open({
				message: `Default Toast`
			});
		}

		function success() {
			toast.open({
				message: 'Success!!!',
				position: 'is-top',
				variant: 'is-success'
			});
		}

		function danger() {
			toast.open({
				message: 'Something went wrong! &nbsp;<em>Message can include html</em> .',
				position: 'is-bottom',
				variant: 'is-danger'
			});
		}

		return {
			success,
			launch,
			danger
		};
	}
});
</script>
