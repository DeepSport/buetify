<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Position" :code="PositionCode" is-vertical>
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
import Simple from './examples/Simple.vue';
import SimpleCode from '!!raw-loader!./examples/Simple.vue';
import Position from './examples/Position.vue';
import PositionCode from '!!raw-loader!./examples/Position.vue';

export default defineComponent({
	name: 'dropdown',
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
