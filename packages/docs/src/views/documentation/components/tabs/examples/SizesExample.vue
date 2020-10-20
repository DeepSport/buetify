<template>
	<section aria-label="b-tabs sizes example">
		<b-tabs size="is-small">
			<b-tab-item label="Account"> </b-tab-item>

			<b-tab-item label="Profile"> </b-tab-item>

			<b-tab-item label="Social"> </b-tab-item>
		</b-tabs>
		<b-tabs>
			<b-tab-item label="Account"> </b-tab-item>

			<b-tab-item label="Profile"> </b-tab-item>

			<b-tab-item label="Social"> </b-tab-item>
		</b-tabs>
		<b-tabs size="is-medium">
			<b-tab-item label="Account"> </b-tab-item>

			<b-tab-item label="Profile"> </b-tab-item>

			<b-tab-item label="Social"> </b-tab-item>
		</b-tabs>
		<b-tabs size="is-large">
			<b-tab-item label="Account"> </b-tab-item>

			<b-tab-item label="Profile"> </b-tab-item>

			<b-tab-item label="Social"> </b-tab-item>
		</b-tabs>
	</section>
</template>
<script lang="ts">
import BTabItem from 'buetify/lib/components/tabs/BTabItem';
import BTabs from 'buetify/lib/components/tabs/BTabs';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'tabs-sizes-example',
	components: {
		BTabs,
		BTabItem
	}
});
</script>
