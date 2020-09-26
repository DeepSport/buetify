<template>
	<section aria-label="simple checkbox example">
		<div class="field">
			<b-checkbox>Basic</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox v-model="checked">
				{{ checked }}
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox v-model="custom" true-value="Yes" false-value="No">
				{{ custom }}
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox is-indeterminate>
				Indeterminate
			</b-checkbox>
		</div>
		<div class="field">
			<b-checkbox is-disabled>Disabled</b-checkbox>
		</div>
	</section>
</template>
<script lang="ts">
import { BCheckbox } from 'buetify/lib/components';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'checkbox-simple-example',
	components: {
		BCheckbox
	},
	setup() {
		const checked = shallowRef(false);
		const custom = shallowRef<'Yes' | 'No'>('Yes');

		return {
			checked,
			custom
		};
	}
});
</script>
