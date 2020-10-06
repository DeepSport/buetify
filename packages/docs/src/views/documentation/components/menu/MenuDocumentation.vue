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
import ApiView from '../../../../components/apiView/ApiView.vue';
import ExampleView from '../../../../components/exampleView/ExampleView.vue';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleExampleCode from '!!raw-loader!./examples/SimpleExample.vue';
import { apis } from './api';

export default defineComponent({
	name: 'menu-documentation',
	components: {
	  ApiView,
		ExampleView,
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

<style lang="sass"></style>
