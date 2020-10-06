<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Variants" :code="VariantsExampleCode" is-vertical>
			<template #component>
				<variants-example></variants-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Min - Max" :code="MinMaxExampleCode" is-vertical>
      <template #component>
        <min-max-example></min-max-example>
      </template>
    </example-view>
    <b-horizontal-divider></b-horizontal-divider>
    <example-view title="Sizes" :code="SizeExampleCode" is-vertical>
      <template #component>
        <size-example></size-example>
      </template>
    </example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Customization" :code="CustomizationExampleCode" is-vertical>
      <template #component>
        <customization-example></customization-example>
      </template>
    </example-view>
    <b-horizontal-divider></b-horizontal-divider>
		<api-view :apis="apis"> </api-view>
	</article>
</template>

<script lang="ts">
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import { defineComponent } from 'vue';
import ApiView from '../../../../../components/apiView/ApiView.vue';
import ExampleView from '../../../../../components/exampleView/ExampleView.vue';
import { apis } from './apis';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import SizeExample from './examples/SizeExample.vue';
import SizeExampleCode from '!!raw-loader!./examples/SizeExample.vue';
import VariantsExample from './examples/VariantsExample.vue';
import VariantsExampleCode from '!!raw-loader!./examples/VariantsExample.vue';
import MinMaxExample from './examples/MinMaxExample.vue';
import MinMaxExampleCode from '!!raw-loader!./examples/MinMaxExample.vue';
import CustomizationExample from './examples/CustomizationExample.vue';
import CustomizationExampleCode from '!!raw-loader!./examples/CustomizationExample.vue';

export default defineComponent({
	name: 'number-input-documentation',
	components: {
		ApiView,
		SimpleExample,
    ExampleView,
    VariantsExample,
    SizeExample,
    MinMaxExample,
    CustomizationExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
      VariantsExampleCode,
      MinMaxExampleCode,
      SizeExampleCode,
      CustomizationExampleCode
		};
	}
});
</script>
