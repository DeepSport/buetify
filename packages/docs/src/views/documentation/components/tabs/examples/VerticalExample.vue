<template>
	<section aria-label="b-tabs vertical example">
		<b-field is-grouped is-grouped-multiline class="margin-bottom-size-6">
			<b-field label="Position">
				<b-select v-model="position" :items="positions"></b-select>
			</b-field>
			<b-field label="Size">
				<b-select v-model="size" :items="sizes"></b-select>
			</b-field>
		</b-field>
		<b-tabs is-vertical :position="position" :size="size">
			<b-tab-item label="Account" :icon="UserCogIcon"> </b-tab-item>

			<b-tab-item label="Profile" :icon="UserIcon"> </b-tab-item>

			<b-tab-item label="Social" :icon="UsersIcon"> </b-tab-item>
		</b-tabs>
	</section>
</template>
<script lang="ts">
import { BField, BSelect } from 'buetify/lib/components';
import BTabItem from 'buetify/lib/components/tabs/BTabItem';
import BTabs, { TabsPosition, TabsSize } from 'buetify/lib/components/tabs/BTabs';
import { defineComponent, shallowRef } from 'vue';
import UserCogIcon from '../../../../../components/icons/UserCogIcon';
import UserIcon from '../../../../../components/icons/UserIcon';
import UsersIcon from '../../../../../components/icons/UsersIcon';

interface Option<T> {
	value: T;
	text: string;
}

const sizes: Option<TabsSize>[] = [
	{
		value: 'is-small',
		text: 'Small'
	},
	{
		value: '',
		text: 'Default'
	},
	{
		value: 'is-medium',
		text: 'Medium'
	},
	{
		value: 'is-large',
		text: 'Large'
	}
];

const positions: Option<TabsPosition>[] = [
	{
		value: '',
		text: 'Default'
	},
	{
		value: 'is-right',
		text: 'Right'
	}
];

export default defineComponent({
	name: 'tabs-vertical-example',
	components: {
		BTabs,
		BTabItem,
		BField,
		BSelect
	},
	setup() {
		const size = shallowRef<TabsSize>('');
		const position = shallowRef<TabsPosition>('');

		return {
			position,
			positions,
			size,
			sizes,
			UserIcon,
			UserCogIcon,
			UsersIcon
		};
	}
});
</script>
