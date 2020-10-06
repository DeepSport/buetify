<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Inline" :code="InlineExampleCode" is-vertical>
			<template #component>
				<inline-example></inline-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Footer" :code="FooterExampleCode" is-vertical>
			<template #component>
				<footer-example></footer-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
				<example-view title="Multiple Dates" :code="MultipleDatesExampleCode" is-vertical>
					<template #component>
						<multiple-dates-example></multiple-dates-example>
					</template>
				</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Events" :code="EventsExampleCode" is-vertical>
			<template #component>
				<events-example></events-example>
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
import EventsExample from './examples/EventsExample.vue';
import EventsExampleCode from '!!raw-loader!./examples/EventsExample.vue';
import MultipleDatesExample from './examples/MultipleDatesExample.vue';
import MultipleDatesExampleCode from '!!raw-loader!./examples/MultipleDatesExample.vue';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import InlineExample from './examples/InlineExample.vue';
import InlineExampleCode from '!!raw-loader!./examples/InlineExample.vue';
import FooterExample from './examples/FooterExample.vue';
import FooterExampleCode from '!!raw-loader!./examples/FooterExample.vue';

export default defineComponent({
	name: 'datepicker-documentation',
	components: {
		ExampleView,
		ApiView,
		SimpleExample,
		InlineExample,
		FooterExample,
		MultipleDatesExample,
		BHorizontalDivider,
		EventsExample
	},
	setup() {
		return {
			apis,
			EventsExampleCode,
			SimpleCode,
			InlineExampleCode,
			FooterExampleCode,
			MultipleDatesExampleCode
		};
	}
});
</script>
