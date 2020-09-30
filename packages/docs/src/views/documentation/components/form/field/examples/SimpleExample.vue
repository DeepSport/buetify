<template>
	<section aria-label="simple b-field example">
		<b-field label="Name">
			<b-input model-value="Harry"></b-input>
		</b-field>
		<b-field label="Email" variant="is-danger" message="Invalid email">
			<b-input type="email" model-value="harry@" maxlength="30"> </b-input>
		</b-field>
		<b-field label="Username" variant="is-success" message="This username is available" :maxlength="30">
			<b-input type="text" model-value="dreadpirateroberts"> </b-input>
		</b-field>
		<b-field
			label="Password"
			variant="is-warning"
			:message="['Password is too short', 'Password must have at least 8 characters']"
		>
			<b-input type="password" model-value="abc"> </b-input>
		</b-field>
	</section>
</template>
<script lang="ts">
import { BInput } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'field-simple-example',
	components: {
		BField,
		BInput
	}
});
</script>
