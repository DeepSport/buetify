<template>
	<section aria-label="b-message color variants examples">
		<b-message title="Default" :icon="UserIcon" use-icon>
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Success" use-icon variant="is-success">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Danger" use-icon variant="is-danger">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Warning" use-icon variant="is-warning">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Info" use-icon variant="is-info">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
	</section>
</template>
<script lang="ts">
import BMessage from 'buetify/lib/components/message/BMessage';
import { defineComponent } from 'vue';
import UserIcon from '../../../../../components/icons/UserIcon';

export default defineComponent({
	name: 'message-icons-example',
	components: {
		BMessage
	},
	setup() {
		return {
			UserIcon
		};
	}
});
</script>
