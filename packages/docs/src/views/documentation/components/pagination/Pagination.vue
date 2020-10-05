<template>
	<article>
		<example-view :code="SimpleCode">
			<template #component>
				<simple></simple>
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
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';

export default defineComponent({
	name: 'pagination',
	components: {
		ExampleView,
		ApiView,
		Simple,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode
		};
	}
});
</script>
