<template>
	<section aria-label="simple radio example">
		<div class="block">
			<b-radio v-model="radio" name="name" native-value="Flint">
				Flint
			</b-radio>
			<b-radio v-model="radio" name="name" native-value="Silver">
				Silver
			</b-radio>
			<b-radio v-model="radio" name="name" native-value="Jack">
				Jack
			</b-radio>
			<b-radio v-model="radio" name="name" native-value="Vane" is-disabled>
				Vane
			</b-radio>
		</div>
    <p class="content">
      <b>Selection:</b>
      {{ radio }}
    </p>
	</section>
</template>
<script lang="ts">
import { BRadio } from 'buetify/lib/components';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'radio-simple-example',
	components: {
		BRadio
	},
	setup() {
		return {
			radio: shallowRef('Jack')
		};
	}
});
</script>
