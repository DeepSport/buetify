<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Position" :code="PositionCode">
			<template #component>
				<position></position>
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
import Position from './examples/PositionExample.vue';
import PositionCode from '!!raw-loader!./examples/PositionExample.vue';

export default defineComponent({
	name: 'dropdown-documentation',
	components: {
		ExampleView,
		ApiView,
		Simple,
		Position,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,

			PositionCode
		};
	}
});
</script>
