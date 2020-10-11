<template>
	<section aria-label="simple b-steps example">
		<b-field is-grouped is-grouped-multiline>
			<p class="control">
				<b-switch v-model="showSocial">
					Show Social Tab
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="isAnimated">
					Animated
				</b-switch>
			</p>
		</b-field>
		<b-field is-grouped is-grouped-multiline>
			<b-field label="Size">
				<b-select v-model="size" :items="sizes"> </b-select>
			</b-field>
			<b-field label="Position">
				<b-select v-model="position" :items="positions"></b-select>
			</b-field>
			<b-field label="Type">
				<b-select v-model="type" :items="types"></b-select>
			</b-field>
		</b-field>
		<p class="padding-top-size-6 has-text-centered"><b>Current Tab: </b>{{ activeTab }}</p>
		<b-tabs v-model="activeTab" :size="size" :is-animated="isAnimated" :position="position" :type="type">
			<b-tab-item label="Account">
				<h1 class="title has-text-centered">Account</h1>
				Lorem ipsum dolor sit amet.
			</b-tab-item>

			<b-tab-item label="Profile">
				<h1 class="title has-text-centered">Profile</h1>
				Lorem ipsum dolor sit amet.
			</b-tab-item>

			<b-tab-item :is-visible="showSocial" label="Social">
				<h1 class="title has-text-centered">Social</h1>
				Lorem ipsum dolor sit amet.
			</b-tab-item>
		</b-tabs>
	</section>
</template>
<script lang="ts">
import { BSelect, BSwitch } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import BTabItem from 'buetify/lib/components/tabs/BTabItem';
import BTabs, { TabsPosition, TabsSize, TabsType } from 'buetify/lib/components/tabs/BTabs';
import { defineComponent, shallowRef } from 'vue';

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
		text: 'Default (Left)'
	},
	{
		value: 'is-centered',
		text: 'Center'
	},
	{
		value: 'is-right',
		text: 'Right'
	}
];

const types: Option<TabsType>[] = [
	{
		value: '',
		text: 'Default'
	},
	{
		value: 'is-boxed',
		text: 'Boxed'
	},
	{
		value: 'is-toggle',
		text: 'Toggle'
	},
	{
		value: 'is-toggle-rounded',
		text: 'Toggle Rounded'
	}
];

export default defineComponent({
	name: 'simple-tabs-example',
	components: {
		BTabs,
		BTabItem,
		BSelect,
		BSwitch,
		BField
	},
	setup() {
		const showSocial = shallowRef(false);
		const isAnimated = shallowRef(false);
		const size = shallowRef<TabsSize>('');
		const position = shallowRef<TabsPosition>('');
		const activeTab = shallowRef(0);
		const type = shallowRef<TabsType>('');

		return {
			position,
			positions,
			showSocial,
			isAnimated,
			size,
			sizes,
			activeTab,
			type,
			types
		};
	}
});
</script>
