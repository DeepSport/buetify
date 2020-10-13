<template>
	<section aria-label="template b-toast examples" class="buttons">
		<b-toast message="Default Toast!">
			<template #default="{ open }">
				<b-button @click="open">
					Launch Default Toast
				</b-button>
			</template>
		</b-toast>
		<b-toast position="is-top" variant="is-warning">
			<template #message>
				Warning!!
			</template>
			<template #default="{ open }">
				<b-button @click="open" variant="is-warning">
					Launch Warning Toast
				</b-button>
			</template>
		</b-toast>
		<b-toast position="is-bottom" variant="is-danger">
			<template #message> Danger toast positioned on bottom. &nbsp;<em>Message can include html</em> </template>
			<template #default="{ open }">
				<b-button @click="open" variant="is-danger">
					Launch Danger Toast
				</b-button>
			</template>
		</b-toast>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BToast from 'buetify/lib/components/notices/toast/BToast';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'template-snackbar-example',
	components: {
		BToast,
		BButton
	}
});
</script>
