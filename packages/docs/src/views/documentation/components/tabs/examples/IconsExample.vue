<template>
	<section aria-label="b-tabs icons example">
		<b-tabs>
			<b-tab-item label="Account" :icon="UserCogIcon"> </b-tab-item>

			<b-tab-item label="Profile" :icon="UserIcon"> </b-tab-item>

			<b-tab-item label="Social" :icon="UsersIcon"> </b-tab-item>
		</b-tabs>
	</section>
</template>
<script lang="ts">
import BTabItem from 'buetify/lib/components/tabs/BTabItem';
import BTabs from 'buetify/lib/components/tabs/BTabs';
import { defineComponent, shallowRef } from 'vue';
import UserCogIcon from '../../../../../components/icons/UserCogIcon';
import UserIcon from '../../../../../components/icons/UserIcon';
import UsersIcon from '../../../../../components/icons/UsersIcon';

export default defineComponent({
	name: 'tabs-icons-example',
	components: {
		BTabs,
		BTabItem
	},
	setup() {
		return {
			UserIcon,
			UserCogIcon,
			UsersIcon
		};
	}
});
</script>
