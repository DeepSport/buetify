<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Nested Dialog" :code="NestedDialogsCode" is-vertical>
			<template #component>
				<nested-dialogs></nested-dialogs>
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
import NestedDialogs from './examples/NestedDialogsExample.vue';
import NestedDialogsCode from '!!raw-loader!./examples/NestedDialogsExample.vue';
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import { apis } from './apis';

export default defineComponent({
	name: 'dialog-documentation',
	components: {
		ExampleView,
		ApiView,
		Simple,
		NestedDialogs,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			NestedDialogsCode,
			SimpleCode
		};
	}
});
</script>

<style lang="sass"></style>
