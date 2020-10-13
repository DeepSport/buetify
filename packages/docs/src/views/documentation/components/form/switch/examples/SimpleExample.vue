<template>
	<section aria-label="simple switch example">
		<div class="field">
			<b-switch>Default</b-switch>
		</div>
		<div class="field">
			<b-switch v-model="isSwitched">
				{{ isSwitched }}
			</b-switch>
		</div>
		<div class="field">
			<b-switch v-model="isSwitchedCustom" true-value="Yes" false-value="No">
				{{ isSwitchedCustom }}
			</b-switch>
		</div>
		<div class="field">
			<b-switch is-disabled>Disabled</b-switch>
		</div>
	</section>
</template>
<script lang="ts">
import { BSwitch } from 'buetify/lib/components';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'switch-simple-example',
	components: {
		BSwitch
	},
	setup() {
		return {
			isSwitched: shallowRef(false),
			isSwitchedCustom: shallowRef('Yes')
		};
	}
});
</script>
