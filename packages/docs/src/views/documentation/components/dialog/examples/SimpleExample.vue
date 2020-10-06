<template>
	<section aria-label="dialog example">
		<b-dialog>
			<template #trigger="{ props }">
				<b-button variant="is-primary" v-bind="props.value">
					Open Dialog
				</b-button>
			</template>
			<template #header>
				<b-title class="has-text-centered is-fullwidth">
					Title
				</b-title>
			</template>
			<template #default>
				<b-field label="First Name">
					<b-input type="text"> </b-input>
				</b-field>
				<b-field label="Last Name">
					<b-input type="text"> </b-input>
				</b-field>
			</template>
			<template #footer="{ close }">
				<b-button is-fullwidth is @click="close" variant="is-success">
					Submit
				</b-button>
			</template>
		</b-dialog>
	</section>
</template>
<script lang="ts">
import { BButton, BTitle, BDialog, BField, BInput } from 'buetify/lib/components';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'dialog-example',
	components: {
		BButton,
    BDialog,
    BTitle,
    BField,
    BInput
	}
});
</script>
