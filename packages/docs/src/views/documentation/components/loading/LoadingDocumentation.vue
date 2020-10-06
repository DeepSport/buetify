<template>
	<article>
		<example-view :code="SimpleCode">
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Templated" :code="TemplateExampleCode">
      <template #content>
        Use the default slot to inject custom content into the loader.
      </template>
			<template #component>
				<template-example></template-example>
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
import TemplateExample from './examples/TemplateExample.vue';
import TemplateExampleCode from '!!raw-loader!./examples/TemplateExample.vue';
import Simple from './examples/Simple.vue';
import SimpleCode from '!!raw-loader!./examples/Simple.vue';

export default defineComponent({
	name: 'loading-documentation',
	components: {
		ExampleView,
		ApiView,
		Simple,
		TemplateExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
			TemplateExampleCode
		};
	}
});
</script>
