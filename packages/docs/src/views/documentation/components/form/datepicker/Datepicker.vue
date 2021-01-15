<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Inline" :code="InlineExampleCode" is-vertical>
      <template #component>
        <inline-example></inline-example>
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
import SimpleExample from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import InlineExample from './examples/InlineExample.vue';
import InlineExampleCode from '!!raw-loader!./examples/InlineExample.vue';

export default defineComponent({
	name: 'datepicker',
	components: {
		ExampleView,
		ApiView,
		SimpleExample,
    InlineExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
      InlineExampleCode
		};
	}
});
</script>
