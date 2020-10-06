<template>
	<article>
		<section class="content padding-bottom-size-3" aria-label="BField child elements">
			<p>Use these components as a direct child of BField</p>
			<ul>
				<li>Autocomplete</li>
				<li>Datepicker</li>
				<li>Input</li>
				<li>Select</li>
				<li><code>.control</code> elements (html class)</li>
			</ul>
		</section>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Object Syntax" :code="ObjectSyntaxExampleCode" is-vertical>
			<template #component>
				<object-syntax-example></object-syntax-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Addons" :code="AddonsExampleCode" is-vertical>
			<template #component>
				<addons-example></addons-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Groups" :code="GroupsExampleCode">
			<template #component>
				<groups-example></groups-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
    <example-view title="Nested Groups" :code="NestedGroupsExampleCode">
      <template #component>
        <nested-groups-example></nested-groups-example>
      </template>
    </example-view>
    <b-horizontal-divider></b-horizontal-divider>
    <example-view title="Responsive Groups" :code="ResponsiveGroupsExampleCode" is-vertical>
      <template #component>
        <responsive-groups-example></responsive-groups-example>
      </template>
    </example-view>
    <b-horizontal-divider></b-horizontal-divider>
    <example-view title="Horizontal" :code="HorizontalExampleCode">
      <template #component>
        <horizontal-example></horizontal-example>
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
import AddonsExample from './examples/AddonsExample.vue';
import AddonsExampleCode from '!!raw-loader!./examples/AddonsExample.vue';
import GroupsExample from './examples/GroupsExample.vue';
import GroupsExampleCode from '!!raw-loader!./examples/GroupsExample.vue';
import NestedGroupsExample from './examples/NestedGroupsExample.vue';
import NestedGroupsExampleCode from '!!raw-loader!./examples/NestedGroupsExample.vue';
import ObjectSyntaxExample from './examples/ObjectSyntaxExample.vue';
import ObjectSyntaxExampleCode from '!!raw-loader!./examples/ObjectSyntaxExample.vue';
import ResponsiveGroupsExampleCode from '!!raw-loader!./examples/ResponsiveGroupsExample.vue';
import ResponsiveGroupsExample from './examples/ResponsiveGroupsExample.vue';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import HorizontalExample from './examples/HorizontalExample.vue';
import HorizontalExampleCode from '!!raw-loader!./examples/HorizontalExample.vue';


export default defineComponent({
	name: 'field-documentation',
	components: {
		ExampleView,
		AddonsExample,
		GroupsExample,
		ApiView,
		SimpleExample,
		ObjectSyntaxExample,
    NestedGroupsExample,
    ResponsiveGroupsExample,
    HorizontalExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
			AddonsExampleCode,
			ObjectSyntaxExampleCode,
			GroupsExampleCode,
      NestedGroupsExampleCode,
      ResponsiveGroupsExampleCode,
      HorizontalExampleCode
		};
	}
});
</script>
