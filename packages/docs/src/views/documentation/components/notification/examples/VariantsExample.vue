<template>
	<section aria-label="b-notification color variants examples">
		<b-notification title="Default">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Success" variant="is-success">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Success" variant="is-success" class="is-light">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Danger" variant="is-danger">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Danger" variant="is-danger" class="is-light">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Warning" variant="is-warning">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Warning" variant="is-warning" class="is-light">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Info" variant="is-info">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
		<b-notification title="Info" variant="is-info" class="is-light">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
	</section>
</template>
<script lang="ts">
import BNotification from 'buetify/lib/components/notices/notification/BNotification';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'notification-variants-example',
	components: {
		BNotification
	}
});
</script>
