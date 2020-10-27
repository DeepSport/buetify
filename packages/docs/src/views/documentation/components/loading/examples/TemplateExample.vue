<template>
	<section aria-label="simple b-loading example">
		<b-field>
			<b-button variant="is-primary" @click="openLoading">
				Launch loading
			</b-button>
		</b-field>
		<b-field>
			<b-switch v-model="isFullscreen">Display loader over full screen</b-switch>
		</b-field>
		<b-message :class="{ 'is-relative': !isFullscreen }">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id
			hendrerit imperdiet, elit sapien laoreet elit
			<b-loading :is-fullscreen="isFullscreen" v-model:is-active="isLoading" can-cancel>
				<b-box class="is-dark margin-size-3">
					Please be patient and refrain from refreshing the page.
				</b-box>
			</b-loading>
		</b-message>
	</section>
</template>
<script lang="ts">
import { BSwitch } from 'buetify/lib/components';
import BButton from 'buetify/lib/components/button/BButton';
import BField from 'buetify/lib/components/form/field';
import BBox from 'buetify/lib/components/layout/box/BBox';
import BLoading from 'buetify/lib/components/loading/BLoading';
import BMessage from 'buetify/lib/components/message/BMessage';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'template-loading-example',
	components: {
		BLoading,
		BButton,
		BSwitch,
		BMessage,
		BField,
		BBox
	},
	setup() {
		const isLoading = shallowRef(false);
		const isFullscreen = shallowRef(true);

		function openLoading() {
			isLoading.value = true;
		}

		return {
			isLoading,
			isFullscreen,
			openLoading
		};
	}
});
</script>
