<template>
	<section aria-label="simple b-steps example">
		<b-field is-grouped is-grouped-multiline>
			<p class="control">
				<b-switch v-model="showSocial">
					Show Social Step
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="isAnimated">
					Animated
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="isRounded">
					Rounded
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="isClickable">
					Clickable Markers
				</b-switch>
			</p>
			<p class="control">
				<b-switch v-model="useSuccess"> Set <code>is-success</code> for profile </b-switch>
			</p>
		</b-field>
		<b-field label="Size">
			<b-select v-model="size" :items="sizes"> </b-select>
		</b-field>
		<p class="padding-top-size-6 has-text-centered"><b>Current Step: </b>{{ activeStep }}</p>
		<b-horizontal-divider></b-horizontal-divider>
		<b-steps v-model="activeStep" :is-animated="isAnimated" :is-rounded="isRounded">
			<b-step-item label="Account" :is-clickable="isClickable">
				<h1 class="title has-text-centered">Account</h1>
				Lorem ipsum dolor sit amet.
			</b-step-item>

			<b-step-item label="Profile" :is-clickable="isClickable" :variant="useSuccess ? 'is-success' : ''">
				<h1 class="title has-text-centered">Profile</h1>
				Lorem ipsum dolor sit amet.
			</b-step-item>

			<b-step-item :is-visible="showSocial" label="Social" :is-clickable="isClickable">
				<h1 class="title has-text-centered">Social</h1>
				Lorem ipsum dolor sit amet.
			</b-step-item>

			<b-step-item label="Finish" :is-clickable="isClickable" is-disabled>
				<h1 class="title has-text-centered">Finish</h1>
				Lorem ipsum dolor sit amet.
			</b-step-item>
		</b-steps>
	</section>
</template>
<script lang="ts">
import { BSelect, BSwitch } from 'buetify/lib/components';
import BField from 'buetify/lib/components/form/field';
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import BStepItem from 'buetify/lib/components/steps/BStepItem';
import BSteps, { StepsSize } from 'buetify/lib/components/steps/BSteps';
import { defineComponent, shallowRef } from 'vue';

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

export default defineComponent({
	name: 'simple-pagination-example',
	components: {
		BSteps,
		BStepItem,
		BSelect,
		BSwitch,
		BField,
		BHorizontalDivider
	},
	setup() {
		const showSocial = shallowRef(false);
		const isRounded = shallowRef(false);
		const isAnimated = shallowRef(false);
		const isClickable = shallowRef(false);
		const useSuccess = shallowRef(false);
		const size = shallowRef<StepsSize>('');

		const activeStep = shallowRef(0);

		return {
			isClickable,
			useSuccess,
			showSocial,
			isRounded,
			isAnimated,
			size,
			sizes,
			activeStep
		};
	}
});
</script>
