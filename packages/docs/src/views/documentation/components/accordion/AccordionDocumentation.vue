<template>
	<article>
		<example-view :code="SimpleExampleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
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
import SimpleExample from './examples/SimpleExample.vue';
import SimpleExampleCode from '!!raw-loader!./examples/SimpleExample.vue';

export default defineComponent({
	name: 'accordion-documentation',
	components: {
		ExampleView,
		ApiView,
		SimpleExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleExampleCode
		};
	}
});
</script>
