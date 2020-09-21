<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Colors and states" :code="ColorsAndStatesCode" is-vertical>
			<template #component>
				<colors-and-states></colors-and-states>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Sizes" :code="SizesCode" is-vertical>
			<template #component>
				<sizes></sizes>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<api-view :apis="apis"> </api-view>
	</article>
</template>

<script lang="ts">
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import { defineComponent } from 'vue';
import { ApiView } from '../../../../components/apiView';
import ExampleView from '../../../../components/exampleView/ExampleView.vue';
import Simple from './examples/Simple.vue';
import SimpleCode from '!!raw-loader!./examples/Simple.vue';
import Sizes from './examples/Sizes.vue';
import SizesCode from '!!raw-loader!./examples/Sizes.vue';
import ColorsAndStates from './examples/ColorsAndStates.vue';
import ColorsAndStatesCode from '!!raw-loader!./examples/ColorsAndStates.vue';
import { api } from './api';

export default defineComponent({
	name: 'Button',
	components: {
		ExampleView,
		ColorsAndStates,
		Sizes,
		ApiView,
		Simple,
    BHorizontalDivider
	},
	setup() {
		return {
			apis: api,
			ColorsAndStatesCode,
			SizesCode,
			SimpleCode
		};
	}
});
</script>

<style lang="sass"></style>
