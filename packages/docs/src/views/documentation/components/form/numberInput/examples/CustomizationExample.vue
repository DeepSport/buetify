<template>
	<section aria-label="b-number-input customization examples">
		<b-field>
			<b-number-input></b-number-input>
		</b-field>
		<b-field label="Rounded controls">
			<b-number-input controls-rounded></b-number-input>
		</b-field>

		<b-field label="Compact">
			<b-number-input controls-position="compact"></b-number-input>
		</b-field>

		<b-field label="Compact and rounded controls">
			<b-number-input controls-position="compact" controls-rounded> </b-number-input>
		</b-field>

		<b-field label="Grouped">
			<b-field is-grouped>
				<p class="control">
					<b-button>Button</b-button>
				</p>
				<b-number-input />
			</b-field>
		</b-field>

		<b-field label="Grouped and expanded">
			<b-field is-grouped>
				<p class="control">
					<b-button>Button</b-button>
				</p>
				<b-number-input is-expanded />
			</b-field>
		</b-field>

		<b-field label="With Addons">
			<b-field>
				<p class="control">
					<b-button>Button</b-button>
				</p>
				<b-number-input controls-position="compact" />
			</b-field>
		</b-field>

		<b-field label="With Addons and expanded">
			<b-field>
				<p class="control">
					<b-button>Button</b-button>
				</p>
				<b-number-input is-expanded controls-position="compact" />
			</b-field>
		</b-field>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BField from 'buetify/lib/components/form/field';
import BNumberInput from 'buetify/lib/components/form/numberInput/BNumberInput';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'customization-example',
	components: {
		BField,
		BNumberInput,
		BButton
	}
});
</script>
