<template>
	<section aria-label="b-fields add-ons example">
		<b-field message="What do you want to search?">
			<b-input placeholder="Search..." type="search" :icon="SearchIcon"> </b-input>
			<p class="control">
				<b-button variant="is-primary">Search</b-button>
			</p>
		</b-field>

		<b-field message="What a beautiful email!!">
			<b-input placeholder="This is expanded" is-expanded></b-input>
			<p class="control">
				<span class="button is-static">@gmail.com</span>
			</p>
		</b-field>

		<hr />
		<b-field>
			<b-select placeholder="Currency" :items="currencies"></b-select>
			<b-input type="number" placeholder="0,00"></b-input>
			<p class="control">
				<b-button variant="is-success">Transfer</b-button>
			</p>
		</b-field>

		<b-field>
			<p class="control">
				<b-button>
					<bold-icon></bold-icon>
				</b-button>
			</p>
			<p class="control">
				<b-button>
					<italic-icon></italic-icon>
				</b-button>
			</p>
			<p class="control">
				<b-button class="button">
					<underline-icon></underline-icon>
				</b-button>
			</p>
			<p class="control">
				<b-button>
					<align-left-icon></align-left-icon>
				</b-button>
			</p>
			<p class="control">
				<b-button>
					<align-center-icon></align-center-icon>
				</b-button>
			</p>
			<p class="control">
				<button class="button">
					<align-right-icon></align-right-icon>
				</button>
			</p>
			<b-input placeholder="Search..." type="search" :icon="SearchIcon"></b-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput, BSelect } from 'buetify/lib/components';
import BButton from 'buetify/lib/components/button/BButton';
import BDropdown from 'buetify/lib/components/dropdown/BDropdown';
import BDropdownItem from 'buetify/lib/components/dropdown/BDropdownItem';
import BField from 'buetify/lib/components/form/field';
import AngleDownIcon from 'buetify/lib/components/icons/angleDown/AngleDownIcon';
import { defineComponent } from 'vue';
import AlignCenterIcon from '../../../../../../components/icons/AlignCenterIcon';
import AlignLeftIcon from '../../../../../../components/icons/AlignLeftIcon';
import AlignRightIcon from '../../../../../../components/icons/AlignRightIcon';
import BoldIcon from '../../../../../../components/icons/BoldIcon';
import ItalicIcon from '../../../../../../components/icons/ItalicIcon';
import SearchIcon from '../../../../../../components/icons/SearchIcon';
import UnderlineIcon from '../../../../../../components/icons/UnderlineIcon';

const currencies = ['$', '£', '€'];

export default defineComponent({
	name: 'field-addons-example',
	components: {
		BField,
		BInput,
		BButton,
		BSelect,
		AlignLeftIcon,
		AlignCenterIcon,
		AlignRightIcon,
		BoldIcon,
		UnderlineIcon,
		ItalicIcon
	},
	setup() {
		return {
			currencies,
			SearchIcon
		};
	}
});
</script>
