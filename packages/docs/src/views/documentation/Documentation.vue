<template>
	<b-app :is-themeable="false" :current-route="route">
		<template #header>
			<buetify-documentation-navbar></buetify-documentation-navbar>
		</template>
		<template #sidebar>
			<buetify-menu class="is-fullheight"></buetify-menu>
		</template>
		<template #default>
			<div class="padding-size-3">
				<documentation-header></documentation-header>
				<b-horizontal-divider></b-horizontal-divider>
				<router-view></router-view>
			</div>
		</template>
	</b-app>
</template>

<script lang="ts">
import { BApp } from 'buetify/lib/components';
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BuetifyDocumentationNavbar from '../../components/buetifyNavbar/BuetifyDocumentationNavbar.vue';
import BuetifyMenu from './menu/BuetifyMenu';
import { DocumentationHeader } from './header';

export default defineComponent({
	name: 'documentation',
	components: {
		BApp,
		BuetifyMenu,
		BuetifyDocumentationNavbar,
		DocumentationHeader,
		BHorizontalDivider
	},
	setup() {
		return {
			route: useRouter().currentRoute
		};
	}
});
</script>
