<template>
	<section aria-label="dropdown simple example">
		<b-dropdown>
			<template #trigger="{ props }">
				<b-button v-bind="props.value">
					Open Bottom Left!
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
				<li>
					<b-button is-fullwidth variant="is-warning" @click="setOff">
						Close me
					</b-button>
				</li>
			</template>
		</b-dropdown>
		<b-dropdown position="is-bottom-right">
			<template #trigger="{ attrs }">
				<b-button variant="is-primary" v-bind="attrs.value">
					Open Bottom Right!
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
    <b-dropdown position="is-top-left">
      <template #trigger="{ attrs }">
        <b-button variant="is-warning" v-bind="attrs.value">
          Open Top Left!
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
    <b-dropdown position="is-top-right">
      <template #trigger="{ attrs }">
        <b-button variant="is-warning" v-bind="attrs.value">
          Open Top Right!
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
	</section>
</template>

<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BDropdown from 'buetify/lib/components/dropdown/BDropdown';
import BDropdownDivider from 'buetify/lib/components/dropdown/BDropdownDivider';
import BDropdownItem from 'buetify/lib/components/dropdown/BDropdownItem';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'dropdown-simple-example',
	components: {
		BDropdown,
		BDropdownItem,
		BDropdownDivider,
		BButton
	}
});
</script>
