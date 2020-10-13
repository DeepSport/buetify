<template>
	<section aria-label="b-fields groups example">
		<b-field is-grouped message="What do you want to search?">
			<b-input placeholder="Search..." type="search" :icon="SearchIcon"> </b-input>
			<p class="control">
				<b-button variant="is-primary">Search</b-button>
			</p>
		</b-field>
		<b-field is-grouped message="What do you want to search?">
			<b-input placeholder="Search..." type="search" :icon="SearchIcon" is-expanded> </b-input>
			<p class="control">
				<b-button variant="is-primary">Search</b-button>
			</p>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput, BSelect } from 'buetify/lib/components';
import BButton from 'buetify/lib/components/button/BButton';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';
import SearchIcon from '../../../../../../components/icons/SearchIcon';

export default defineComponent({
	name: 'field-groups-example',
	components: {
		BField,
		BInput,
		BButton
	},
	setup() {
		return {
			SearchIcon
		};
	}
});
</script>
