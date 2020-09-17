<template>
	<b-menu class="padding-size-1 is-light">
		<b-menu-group is-expanded>
			<template #menu-label>
				<b-menu-label>
					UI Components
				</b-menu-label>
			</template>
			<template #default>
				<b-menu-list-item>
					<router-link to="/documentation/button">Button</router-link>
				</b-menu-list-item>
			</template>
		</b-menu-group>
	</b-menu>
</template>

<script lang="ts">
import { BMenu, BMenuGroup, BMenuLabel, BMenuListItem } from 'buetify/lib/components';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'buetify-sidebar',
	components: {
		BMenu,
		BMenuLabel,
		BMenuListItem,
		BMenuGroup
	}
});
</script>

<style lang="sass"></style>
