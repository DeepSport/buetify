<template>
	<article>
		<example-view :code="SimpleCode">
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Fullscreen" :code="FullscreenExampleCode">
			<template #component>
				<fullscreen-example></fullscreen-example>
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
import FullscreenExample from './examples/FullscreenExample.vue';
import FullscreenExampleCode from '!!raw-loader!./examples/FullscreenExample.vue';
import Simple from './examples/Simple.vue';
import SimpleCode from '!!raw-loader!./examples/Simple.vue';

export default defineComponent({
	name: 'modal',
	components: {
		ExampleView,
		ApiView,
		Simple,
		FullscreenExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
			FullscreenExampleCode
		};
	}
});
</script>
