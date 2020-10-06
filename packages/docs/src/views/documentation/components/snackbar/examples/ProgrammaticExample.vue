<template>
	<section aria-label="programmatic b-snackbar examples" class="buttons">
		<b-button @click="launch">
			Launch Default Snackbar
		</b-button>
		<b-button @click="warn" variant="is-warning">
			Launch Warning Snackbar
		</b-button>
		<b-button @click="danger" variant="is-danger">
			Launch Danger Snackbar
		</b-button>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import { useSnackbar, useToast } from 'buetify/lib/composables';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'template-snackbar-example',
	components: {
		BButton
	},
	setup() {
		const snackbar = useSnackbar();
		const toast = useToast();

		function onAction() {
			toast.open({
				variant: 'is-dark',
				message: 'Action Pressed',
				position: 'is-top',
				shouldQueue: false
			});
		}

		function launch() {
			snackbar.open({
				message: `Default, positioned bottom-right with a green 'OK' button`
			});
		}

		function warn() {
			snackbar.open({
				message: 'Yellow button and positioned on top, click to close',
				position: 'is-top',
				actionText: 'Retry',
				variant: 'is-warning',
				isIndefinite: true,
				onAction: onAction
			});
		}

		function danger() {
			snackbar.open({
				message: 'Snackbar with red action, positioned on bottom-left and a callback.<br>Note: <em>Message can include html</em>.',
				position: 'is-bottom-left',
				actionText: 'Retry',
				variant: 'is-danger',
				isIndefinite: true,
				onAction: onAction
			});
		}

		return {
			launch,
			warn,
			danger
		};
	}
});
</script>
