<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple></simple>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Closable" :code="ClosableExampleCode" is-vertical>
			<template #component>
				<closable-example></closable-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Tag List" :code="TagListExampleCode" is-vertical>
			<template #component>
				<tag-list-example></tag-list-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view :code="AttachedTagListExampleCode" is-vertical>
			<template #content>
				<p>Use the <code>is-attached</code> prop to attach tags together</p>
			</template>
			<template #component>
				<attached-tag-list-example></attached-tag-list-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view :code="GroupedTagListExampleCode" is-vertical>
			<template #content>
				<p>Combine with <code>b-field</code> to group tags together</p>
			</template>
			<template #component>
				<grouped-tag-list-example></grouped-tag-list-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Colors and Sizes" :code="ColorsAndStatesCode" is-vertical>
			<template #component>
				<colors-and-states></colors-and-states>
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
import AttachedTagListExample from './examples/AttachedTagListExample.vue';
import AttachedTagListExampleCode from '!!raw-loader!./examples/AttachedTagListExample.vue';
import ClosableExample from './examples/ClosableExample.vue';
import ClosableExampleCode from '!!raw-loader!./examples/ClosableExample.vue';
import GroupedTagListExample from './examples/GroupedTagListExample.vue';
import GroupedTagListExampleCode from '!!raw-loader!./examples/GroupedTagListExample.vue';
import Simple from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import ColorsAndStates from './examples/ColorsAndStatesExample.vue';
import ColorsAndStatesCode from '!!raw-loader!./examples/ColorsAndStatesExample.vue';
import { api } from './api';
import TagListExample from './examples/TagListExample.vue';
import TagListExampleCode from '!!raw-loader!./examples/TagListExample.vue';

export default defineComponent({
	name: 'tag-documentation',
	components: {
		ExampleView,
		ColorsAndStates,
		ApiView,
		Simple,
		BHorizontalDivider,
		ClosableExample,
		TagListExample,
		AttachedTagListExample,
		GroupedTagListExample
	},
	setup() {
		return {
			apis: api,
			ColorsAndStatesCode,
			SimpleCode,
			ClosableExampleCode,
			TagListExampleCode,
			AttachedTagListExampleCode,
			GroupedTagListExampleCode
		};
	}
});
</script>
