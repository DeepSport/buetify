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
    <example-view title="Headerless" :code="HeaderlessExampleCode" is-vertical>
      <template #component>
        <headerless-example></headerless-example>
      </template>
    </example-view>
    <b-horizontal-divider></b-horizontal-divider>
    <example-view title="Icons" :code="IconsExampleCode" is-vertical>
      <template #component>
        <icons-example></icons-example>
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
import HeaderlessExample from './examples/HeaderlessExample.vue';
import HeaderlessExampleCode from '!!raw-loader!./examples/HeaderlessExample.vue';
import Simple from './examples/Simple.vue';
import SimpleCode from '!!raw-loader!./examples/Simple.vue';
import IconsExampleCode from '!!raw-loader!./examples/IconsExample.vue';
import IconsExample from './examples/IconsExample.vue';
import VariantsExample from './examples/VariantsExample.vue';
import VariantsExampleCode from '!!raw-loader!./examples/VariantsExample.vue';

export default defineComponent({
	name: 'message',
	components: {
		ExampleView,
		ApiView,
		Simple,
    VariantsExample,
    IconsExample,
    HeaderlessExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
      VariantsExampleCode,
      HeaderlessExampleCode,
      IconsExampleCode
		};
	}
});
</script>
