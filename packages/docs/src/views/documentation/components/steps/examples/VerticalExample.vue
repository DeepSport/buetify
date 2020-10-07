<template>
	<section aria-label="b-steps vertical example">
		<b-field is-grouped is-grouped-multiline="">
			<b-field label="Steps Position">
				<b-select v-model="position" :items="stepsPosition"></b-select>
			</b-field>
			<b-field label="Label Position">
				<b-select v-model="labelPosition" :items="labelPositions"></b-select>
			</b-field>
			<b-field label="Size">
				<b-select v-model="size" :items="sizes"></b-select>
			</b-field>
		</b-field>
		<b-steps is-vertical :position="position" :label-position="labelPosition" :size="size">
			<b-step-item label="Account" :icon="UserCogIcon"> </b-step-item>

			<b-step-item label="Profile" :icon="UserIcon"> </b-step-item>

			<b-step-item label="Social" :icon="UsersIcon"> </b-step-item>
		</b-steps>
	</section>
</template>
<script lang="ts">
import { BField, BSelect } from 'buetify/lib/components';
import BStepItem from 'buetify/lib/components/steps/BStepItem';
import BSteps, { StepLabelPosition, StepsPosition, StepsSize } from 'buetify/lib/components/steps/BSteps';
import { defineComponent, shallowRef } from 'vue';
import UserCogIcon from '../../../../../components/icons/UserCogIcon';
import UserIcon from '../../../../../components/icons/UserIcon';
import UsersIcon from '../../../../../components/icons/UsersIcon';

interface Option<T> {
	value: T;
	text: string;
}

const sizes: Option<StepsSize>[] = [
	{
		value: 'is-small',
		text: 'Small'
	},
	{
		value: '',
		text: 'Default'
	},
	{
		value: 'is-medium',
		text: 'Medium'
	},
	{
		value: 'is-large',
		text: 'Large'
	}
];

const labelPositions: Option<StepLabelPosition>[] = [
	{
		value: '',
		text: 'Default'
	},
	{
		value: 'is-right',
		text: 'Right'
	},
	{
		value: 'is-left',
		text: 'Left'
	}
];

const stepsPosition: Option<StepsPosition>[] = [
	{
		value: '',
		text: 'Default (Left)'
	},
	{
		value: 'is-right',
		text: 'Right'
	}
];

export default defineComponent({
	name: 'steps-vertical-example',
	components: {
		BSteps,
		BStepItem,
		BField,
		BSelect
	},
	setup() {
		const size = shallowRef<StepsSize>('');
		const labelPosition = shallowRef<StepLabelPosition>('');
		const position = shallowRef<StepsPosition>('');

		return {
			position,
			stepsPosition,
			size,
			sizes,
			labelPosition,
			labelPositions,
			UserIcon,
			UserCogIcon,
			UsersIcon
		};
	}
});
</script>
