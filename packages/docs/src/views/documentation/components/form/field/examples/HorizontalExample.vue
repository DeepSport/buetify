<template>
	<section aria-label="horizontal b-field example">
		<b-field is-horizontal label="Subject" variant="is-danger" message="Please enter a subject">
			<b-input name="subject" is-expanded></b-input>
		</b-field>

		<b-field is-horizontal label="From">
			<b-input name="name" placeholder="Name" is-expanded></b-input>
			<b-input name="email" type="email" placeholder="nobody@nowhere.com" is-expanded></b-input>
		</b-field>

		<b-field is-horizontal label="Topic">
			<b-select placeholder="Select a topic" :items="['Bulma', 'Vue.js', 'Buetify']"> </b-select>
		</b-field>

		<b-field is-horizontal label="Message">
			<b-input type="textarea"></b-input>
		</b-field>

		<b-field is-horizontal
			><!-- Label left empty for spacing -->
			<p class="control">
				<b-button variant="is-primary">
					Send message
				</b-button>
			</p>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput, BSelect } from 'buetify/lib/components';
import BButton from 'buetify/lib/components/button/BButton';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'field-horizontal-example',
	components: {
		BField,
		BInput,
		BButton,
		BSelect
	}
});
</script>
