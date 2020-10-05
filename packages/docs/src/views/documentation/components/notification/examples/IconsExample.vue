<template>
	<section aria-label="b-notification color variants examples">
		<b-notification title="Default" use-icon :icon="UserIcon">
			<template #default>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
				id hendrerit imperdiet, elit sapien laoreet elit
			</template>
		</b-notification>
    <b-notification title="Success" use-icon variant="is-success">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
        id hendrerit imperdiet, elit sapien laoreet elit
      </template>
    </b-notification>
    <b-notification title="Danger" use-icon variant="is-danger">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
        id hendrerit imperdiet, elit sapien laoreet elit
      </template>
    </b-notification>
    <b-notification title="Warning" use-icon variant="is-warning">
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh
        id hendrerit imperdiet, elit sapien laoreet elit
      </template>
    </b-notification>
    <b-notification title="Info" use-icon variant="is-info">
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
import UserIcon from '../../../../../components/icons/UserIcon';

export default defineComponent({
	name: 'notification-icons-example',
	components: {
		BNotification
	},
  setup() {
	  return {
	    UserIcon
    }
  }
});
</script>
