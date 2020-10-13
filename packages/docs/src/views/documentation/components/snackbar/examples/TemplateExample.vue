<template>
	<section aria-label="template b-snackbar examples" class="buttons">
		<b-snackbar message="Default, positioned bottom-right with a green 'OK' button">
			<template #default="{ open }">
				<b-button @click="open">
					Launch Default Snackbar
				</b-button>
			</template>
		</b-snackbar>
		<b-snackbar position="is-top" variant="is-warning" is-indefinite :on-action="onAction">
			<template #message>
				Yellow button and positioned on top, click to close
			</template>
			<template #action>
				Retry
			</template>
			<template #default="{ open }">
				<b-button @click="open" variant="is-warning">
					Launch Warning Snackbar
				</b-button>
			</template>
		</b-snackbar>
		<b-snackbar position="is-bottom-left" variant="is-danger" is-indefinite :on-action="onAction">
			<template #message>
				Snackbar with red action, positioned on bottom-left and a callback.<br />Note:
				<em>Message can include html</em>.
			</template>
			<template #default="{ open }">
				<b-button @click="open" variant="is-danger">
					Launch Danger Snackbar
				</b-button>
			</template>
		</b-snackbar>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BSnackbar from 'buetify/lib/components/notices/snackbar/BSnackbar';
import { useToast } from 'buetify/lib/composables';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'template-snackbar-example',
	components: {
		BSnackbar,
		BButton
	},
	setup() {
		const toast = useToast();

		function onAction() {
			toast.open({
				variant: 'is-dark',
				message: 'Action Pressed',
				position: 'is-top',
				shouldQueue: false
			});
		}

		return {
			onAction
		};
	}
});
</script>
