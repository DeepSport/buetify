<template>
	<section aria-label="simple b-message example">
		<b-button @click="toggle">
			Toggle
		</b-button>
		<b-message v-model:is-active="isActive" class="margin-top-size-6">
			<template #title>
				Default
			</template>
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BMessage from 'buetify/lib/components/message/BMessage';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'simple-message-example',
	components: {
		BMessage,
		BButton
	},
	setup() {
		const isActive = shallowRef(false);

		function toggle() {
			isActive.value = !isActive.value;
		}

		return {
			isActive,
			toggle
		};
	}
});
</script>
