<template>
	<section aria-label="b-message color variants examples">
		<b-message title="Default">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Success" variant="is-success">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Danger" variant="is-danger">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Warning" variant="is-warning">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
		<b-message title="Info" variant="is-info">
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

export default defineComponent({
	name: 'message-variants-example',
	components: {
		BMessage
	}
});
</script>
