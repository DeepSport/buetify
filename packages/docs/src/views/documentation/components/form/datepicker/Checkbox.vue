<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
    <b-horizontal-divider></b-horizontal-divider>
    <example-view title="Variants" :code="VariantsExampleCode" is-vertical>
      <template #component>
        <variants-example></variants-example>
      </template>
    </example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Sizes" :code="SizesExampleCode" is-vertical>
      <template #component>
        <sizes-example></sizes-example>
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
import { ExampleView } from '../../../../../components/exampleView';
import { apis } from './apis';
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import SizesExample from './examples/SizesExample.vue';
import SizesExampleCode from '!!raw-loader!./examples/SizesExample.vue';
import VariantsExample from './examples/VariantsExample.vue';
import VariantsExampleCode from '!!raw-loader!./examples/VariantsExample.vue';

export default defineComponent({
	name: 'checkbox',
	components: {
		ExampleView,
		ApiView,
		Simple,
    SizesExample,
		BHorizontalDivider,
    VariantsExample
	},
	setup() {
		return {
			apis,
			SimpleCode,
      SizesExampleCode,
      VariantsExampleCode
		};
	}
});
</script>
