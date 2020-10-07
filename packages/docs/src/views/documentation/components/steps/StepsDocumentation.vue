<template>
	<article>
		<example-view :code="SimpleCode">
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Icons" :code="IconsExampleCode">
      <template #component>
        <icons-example></icons-example>
      </template>
    </example-view>
    <b-horizontal-divider></b-horizontal-divider>
    <example-view title="Vertical" :code="VerticalExampleCode">
      <template #component>
        <vertical-example></vertical-example>
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
import IconsExample from './examples/IconsExample.vue';
import IconsExampleCode from '!!raw-loader!./examples/IconsExample.vue';
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import VerticalExampleCode from '!!raw-loader!./examples/VerticalExample.vue';
import VerticalExample from './examples/VerticalExample.vue';

export default defineComponent({
	name: 'steps-documentation',
	components: {
		ExampleView,
		ApiView,
		Simple,
		BHorizontalDivider,
    IconsExample,
    VerticalExample
	},
	setup() {
		return {
			apis,
			SimpleCode,
      IconsExampleCode,
      VerticalExampleCode
		};
	}
});
</script>
