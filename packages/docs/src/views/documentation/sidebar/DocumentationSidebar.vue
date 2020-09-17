<template>
	<b-menu class="padding-size-1 is-light">
		<b-menu-group is-expanded>
			<template #menu-label>
				<b-menu-label>
					UI Components
				</b-menu-label>
			</template>
			<template #default>
        <router-link to="/documentation/button" custom>
          <template #default="{ isActive, navigate, href }">
            <b-menu-list-item>
              <a :href="href" :class="{ 'is-active': isActive }" @click="navigate">Button</a>
            </b-menu-list-item>
          </template>
        </router-link>
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
