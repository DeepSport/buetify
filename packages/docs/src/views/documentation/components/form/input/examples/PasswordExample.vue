<template>
	<section aria-label="b-input password example">
		<b-field>
			<b-input type="password" placeholder="Password reveal input"> </b-input>
		</b-field>

		<b-field>
			<b-input type="password" placeholder="No password reveal input" :use-password-reveal="false"> </b-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'password-input-example',
	components: {
		BField,
		BInput
	}
});
</script>
