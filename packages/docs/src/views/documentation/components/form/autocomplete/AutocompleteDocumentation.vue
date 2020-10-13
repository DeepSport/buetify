<template>
	<article>
		<example-view :code="SimpleCode">
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Custom Header" :code="HeaderExampleCode">
			<template #component>
				<header-example></header-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Custom Footer" :code="FooterExampleCode">
			<template #component>
				<footer-example></footer-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Object Array" :code="ObjectArrayExampleCode">
			<template #component>
				<object-array-example></object-array-example>
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
import ObjectArrayExample from './examples/ObjectArrayExample.vue';
import ObjectArrayExampleCode from '!!raw-loader!./examples/ObjectArrayExample.vue';
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import HeaderExample from './examples/HeaderExample.vue';
import HeaderExampleCode from '!!raw-loader!./examples/HeaderExample.vue';
import FooterExample from './examples/FooterExample.vue';
import FooterExampleCode from '!!raw-loader!./examples/FooterExample.vue';

export default defineComponent({
	name: 'autocomplete-documentation',
	components: {
		ObjectArrayExample,
		ExampleView,
		HeaderExample,
		FooterExample,
		ApiView,
		Simple,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
			ObjectArrayExampleCode,
			HeaderExampleCode,
			FooterExampleCode
		};
	}
});
</script>
