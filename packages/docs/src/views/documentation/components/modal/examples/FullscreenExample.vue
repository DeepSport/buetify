<template>
	<section aria-label="fullscreen b-modal example">
		<b-modal is-fullscreen>
			<template #trigger="{ open }">
				<b-button variant="is-primary" @click="open">
					Open Fullscreen Modal
				</b-button>
			</template>
			<template #default="{ close }">
				<article class="modal-card">
					<header class="modal-card-head">
						<h1 class="modal-card-title">Log In</h1>
					</header>
					<section class="modal-card-body">
						<form @submit.prevent>
							<b-field label="Email">
								<b-input type="email" model-value="evan@you.com" is-required></b-input>
							</b-field>
							<b-field label="Password">
								<b-input type="password" model-value="abc" is-required> </b-input>
							</b-field>
							<b-checkbox>
								Remember Me
							</b-checkbox>
						</form>
					</section>
					<footer class="modal-card-foot">
						<b-button variant="is-warning" @click="close">
							Close
						</b-button>
						<b-button variant="is-primary" @click="close">
							Log In
						</b-button>
					</footer>
				</article>
			</template>
		</b-modal>
	</section>
</template>
<script lang="ts">
import { BCheckbox, BInput } from 'buetify/lib/components';
import BButton from 'buetify/lib/components/button/BButton';
import BField from 'buetify/lib/components/form/field';
import BBox from 'buetify/lib/components/layout/box/BBox';
import BModal from 'buetify/lib/components/modal/BModal';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'simple-modal-example',
	components: {
		BModal,
		BButton,
		BField,
		BInput,
		BCheckbox
	}
});
</script>
