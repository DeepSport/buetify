<template>
	<b-app :is-themeable="false">
		<template #header>
			<buetify-navbar></buetify-navbar>
		</template>
		<template #navigation-drawer>
			<documentation-sidebar class="is-fullheight"></documentation-sidebar>
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
import DocumentationSidebar from './sidebar/DocumentationSidebar.vue';
import { DocumentationHeader } from './header';

export default defineComponent({
	name: 'documentation',
	components: {
		BApp,
    DocumentationSidebar,
		BuetifyNavbar,
		DocumentationHeader,
		BHorizontalDivider
	}
});
</script>
