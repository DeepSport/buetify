<template>
	<section aria-label="b-dropdown position example" class="is-flex flex-direction-row justify-content-space-between">
		<b-dropdown>
			<template #trigger="{ props }">
				<b-button v-bind="props.value">
					Bottom Right!
				</b-button>
			</template>
			<template #default="{ setOff }">
				<b-dropdown-item>
					Item A
				</b-dropdown-item>
				<b-dropdown-item>
					Item B
				</b-dropdown-item>
				<b-dropdown-item>
					Item C
				</b-dropdown-item>
				<b-dropdown-divider></b-dropdown-divider>
				<b-dropdown-item>
					<b-button is-fullwidth variant="is-warning" @click="setOff">
						Close me
					</b-button>
				</b-dropdown-item>
			</template>
		</b-dropdown>
		<b-dropdown position="is-bottom-left" class="margin-left-size-7">
			<template #trigger="{ attrs }">
				<b-button variant="is-primary" v-bind="attrs.value">
					Bottom Left!
				</b-button>
			</template>
			<template #default>
				<b-dropdown-item>
					Item A
				</b-dropdown-item>
				<b-dropdown-item>
					Item B
				</b-dropdown-item>
				<b-dropdown-item>
					Item C
				</b-dropdown-item>
			</template>
		</b-dropdown>
		<b-dropdown position="is-top-right" class="margin-left-size-7">
			<template #trigger="{ attrs }">
				<b-button variant="is-info" v-bind="attrs.value">
					Top Right!
				</b-button>
			</template>
			<template #default>
				<b-dropdown-item class="is-active">
					Item A
				</b-dropdown-item>
				<b-dropdown-item>
					Item B
				</b-dropdown-item>
				<b-dropdown-item>
					Item C
				</b-dropdown-item>
			</template>
		</b-dropdown>
		<b-dropdown position="is-top-left" class="margin-left-size-7">
			<template #trigger="{ attrs }">
				<b-button variant="is-warning" v-bind="attrs.value">
					Top Left!
				</b-button>
			</template>
			<template #default>
				<b-dropdown-item>
					Item A
				</b-dropdown-item>
				<b-dropdown-item>
					Item B
				</b-dropdown-item>
				<b-dropdown-item>
					Item C
				</b-dropdown-item>
			</template>
		</b-dropdown>
	</section>
</template>

<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BDropdown from 'buetify/lib/components/dropdown/BDropdown';
import BDropdownDivider from 'buetify/lib/components/dropdown/BDropdownDivider';
import BDropdownItem from 'buetify/lib/components/dropdown/BDropdownItem';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'dropdown-position-example',
	components: {
		BDropdown,
		BDropdownItem,
		BDropdownDivider,
		BButton
	}
});
</script>
