<template>
	<section aria-label="b-tabs types example">
    <b-tabs>
      <b-tab-item label="Account"> </b-tab-item>

      <b-tab-item label="Profile" > </b-tab-item>

      <b-tab-item label="Social"> </b-tab-item>
    </b-tabs>
		<b-tabs type="is-boxed">
			<b-tab-item label="Account"> </b-tab-item>

			<b-tab-item label="Profile" > </b-tab-item>

			<b-tab-item label="Social"> </b-tab-item>
		</b-tabs>
    <b-tabs type="is-toggle">
      <b-tab-item label="Account"> </b-tab-item>

      <b-tab-item label="Profile" > </b-tab-item>

      <b-tab-item label="Social"> </b-tab-item>
    </b-tabs>
    <b-tabs type="is-toggle-rounded">
      <b-tab-item label="Account"> </b-tab-item>

      <b-tab-item label="Profile" > </b-tab-item>

      <b-tab-item label="Social"> </b-tab-item>
    </b-tabs>
	</section>
</template>
<script lang="ts">
import BTabItem from 'buetify/lib/components/tabs/BTabItem';
import BTabs from 'buetify/lib/components/tabs/BTabs';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'tabs-types-example',
	components: {
		BTabs,
		BTabItem
	}
});
</script>
