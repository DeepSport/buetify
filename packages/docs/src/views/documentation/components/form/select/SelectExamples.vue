<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Object Array" :code="ObjectArrayExampleCode" is-vertical>
			<template #component>
				<object-array-example></object-array-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Multiple" :code="MultipleExampleCode" is-vertical>
      <template #component>
        <multiple-example></multiple-example>
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
import MultipleExample from './examples/MultipleExample.vue';
import MultipleExampleCode from '!!raw-loader!./examples/MultipleExample.vue';
import ObjectArrayExample from './examples/ObjectArrayExample.vue';
import ObjectArrayExampleCode from '!!raw-loader!./examples/ObjectArrayExample.vue';
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';

export default defineComponent({
	name: 'select-examples',
	components: {
		ObjectArrayExample,
    MultipleExample,
		ExampleView,
		ApiView,
		Simple,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
			ObjectArrayExampleCode,
      MultipleExampleCode
		};
	}
});
</script>
