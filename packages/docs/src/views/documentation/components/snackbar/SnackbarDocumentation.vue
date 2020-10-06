<template>
	<article>
		<p>
			Snackbars have only one button and are queued by default. They can be used programmatically or via a
			component.
		</p>
    <p class="padding-bottom-size-6 padding-top-size-6"><b>Note:</b> Snackbars and Toasts will share a queue</p>
		<example-view title="Template" :code="TemplateExampleCode">
			<template #component>
				<template-example></template-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Programmatic" :code="ProgrammaticExampleCode">
			<template #component>
				<programmatic-example></programmatic-example>
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
import ProgrammaticExampleCode from '!!raw-loader!./examples/ProgrammaticExample.vue';
import ProgrammaticExample from './examples/ProgrammaticExample.vue';

export default defineComponent({
	name: 'snackbar-documentation',
	components: {
		ExampleView,
		ApiView,
		TemplateExample,
		ProgrammaticExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			ProgrammaticExampleCode,
			TemplateExampleCode
		};
	}
});
</script>
