<template>
	<section aria-label="simple b-notification example">
		<b-button @click="toggle">
			Toggle
		</b-button>
		<b-notification v-model:is-active="isActive" class="margin-top-size-6">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id
			hendrerit imperdiet, elit sapien laoreet elit
		</b-notification>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BNotification from 'buetify/lib/components/notices/notification/BNotification';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'simple-notification-example',
	components: {
		BNotification,
		BButton
	},
	setup() {
		const isActive = shallowRef(true);

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
