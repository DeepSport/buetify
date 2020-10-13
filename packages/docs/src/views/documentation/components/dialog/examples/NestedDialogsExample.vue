<template>
	<section aria-label="dialog example">
		<b-dialog>
			<template #trigger="{ props }">
				<b-button variant="is-link" v-bind="props.value">
					Open First Dialog
				</b-button>
			</template>
			<template #header>
				<b-title>First Dialog</b-title>
			</template>
			<template #default>
				<b-dialog>
					<template #trigger="{ props }">
						<b-button is-fullwidth variant="is-warning" v-bind="props.value">
							Open Nested Dialog
						</b-button>
					</template>
					<template #header>
						<b-title>Nested</b-title>
					</template>
					<template #default>
						<p>
							Nested Dialog!
						</p>
					</template>
					<template #footer="{ close }">
						<b-button is-fullwidth @click="close" variant="is-danger">Close</b-button>
					</template>
				</b-dialog>
			</template>
			<template #footer="{ close }">
				<b-button is-fullwidth @click="close" variant="is-success">
					Submit
				</b-button>
			</template>
		</b-dialog>
	</section>
</template>
<script lang="ts">
import { BButton, BDialog, BTitle } from 'buetify/lib/components';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'nested-dialog-example',
	components: {
		BButton,
		BDialog,
		BTitle
	}
});
</script>
