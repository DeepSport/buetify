<template>
	<b-app :is-themeable="false">
		<template #header>
			<buetify-navbar></buetify-navbar>
		</template>
		<template #navigation-drawer>
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
import BuetifyNavbar from '../../components/buetifyNavbar/BuetifyNavbar.vue';
import BuetifyMenu from './menu/BuetifyMenu';
import { DocumentationHeader } from './header';

export default defineComponent({
	name: 'documentation',
	components: {
		BApp,
		BuetifyMenu,
		BuetifyNavbar,
		DocumentationHeader,
		BHorizontalDivider
	}
});
</script>
