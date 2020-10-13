<template>
	<article>
		<example-view :code="SimpleExampleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Styles" :code="StylesExampleCode" is-vertical>
			<template #component>
				<styles-example></styles-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Multilined" :code="MultilinedExampleCode">
			<template #component>
				<multilined-example></multilined-example>
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
import { apis } from './apis';
import MultilinedExample from './examples/MultilinedExample.vue';
import MultilinedExampleCode from '!!raw-loader!./examples/MultilinedExample.vue';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleExampleCode from '!!raw-loader!./examples/SimpleExample.vue';
import StylesExampleCode from '!!raw-loader!./examples/StylesExample.vue';
import StylesExample from './examples/StylesExample.vue';

export default defineComponent({
	name: 'tooltip-documentation',
	components: {
		ExampleView,
		ApiView,
		MultilinedExample,
		SimpleExample,
		BHorizontalDivider,
		StylesExample
	},
	setup() {
		return {
			apis,
			MultilinedExampleCode,
			SimpleExampleCode,
			StylesExampleCode
		};
	}
});
</script>

<style lang="sass">
.b-tooltips
  .b-tooltip:not(:last-child)
    margin-right: .5em
  .b-tooltip
    margin-bottom: .5em
</style>
