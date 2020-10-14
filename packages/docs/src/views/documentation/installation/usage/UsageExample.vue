<template>
	<b-app>
		<template #header>
			<b-app-header>
				<b-title class="has-font-lobster has-text-primary has-text-centered">Buetify</b-title>
			</b-app-header>
		</template>
		<template #sidebar>
			<b-menu>
				<b-menu-list>
					<b-menu-list-item>
						A Menu Item
					</b-menu-list-item>
				</b-menu-list>
			</b-menu>
		</template>
		<template #default>
			<div class="padding-size-3">
				Your main content goes here!
				<b-horizontal-divider></b-horizontal-divider>
			</div>
		</template>
	</b-app>
</template>

<script lang="ts">
import { BApp } from 'buetify/lib/components';
import BAppHeader from 'buetify/lib/components/appHeader';
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import BMenu from 'buetify/lib/components/menu/BMenu';
import BMenuList from 'buetify/lib/components/menu/BMenuList';
import BMenuListItem from 'buetify/lib/components/menu/BMenuListItem';
import BTitle from 'buetify/lib/components/title/BTitle';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'usage-example',
	components: {
		BApp,
		BAppHeader,
		BMenu,
		BMenuList,
		BMenuListItem,
		BTitle,
		BHorizontalDivider
	}
});
</script>
