<template>
	<section aria-label="b-steps icons example">
		<b-steps>
			<b-step-item label="Account" :icon="UserCogIcon"> </b-step-item>

			<b-step-item label="Profile" :icon="UserIcon"> </b-step-item>

			<b-step-item label="Social" :icon="UsersIcon"> </b-step-item>
		</b-steps>
	</section>
</template>
<script lang="ts">
import BStepItem from 'buetify/lib/components/steps/BStepItem';
import BSteps, { StepLabelPosition, StepsMobileMode, StepsSize } from 'buetify/lib/components/steps/BSteps';
import { defineComponent, shallowRef } from 'vue';
import UserCogIcon from '../../../../../components/icons/UserCogIcon';
import UserIcon from '../../../../../components/icons/UserIcon';
import UsersIcon from '../../../../../components/icons/UsersIcon';

export default defineComponent({
	name: 'steps-icons-example',
	components: {
		BSteps,
		BStepItem
	},
	setup() {
		return {
			UserIcon,
			UserCogIcon,
			UsersIcon
		};
	}
});
</script>
