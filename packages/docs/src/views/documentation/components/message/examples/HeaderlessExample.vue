<template>
	<section aria-label="b-message headerless variants examples">
		<b-message>
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-message>
    <b-message variant="is-success">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
        id hendrerit imperdiet, elit sapien laoreet elit
      </template>
    </b-message>
    <b-message variant="is-danger">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
        id hendrerit imperdiet, elit sapien laoreet elit
      </template>
    </b-message>
    <b-message variant="is-warning">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
        id hendrerit imperdiet, elit sapien laoreet elit
      </template>
    </b-message>
    <b-message variant="is-info">
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
	name: 'message-headerless-example',
	components: {
		BMessage
	}
});
</script>
