<template>
	<article>
		<example-view :code="SimpleCode" is-vertical>
			<template #component>
				<simple-example></simple-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Variants and States" :code="VariantsAndStatesExampleCode" is-vertical>
			<template #component>
				<variants-and-states-example></variants-and-states-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Validation" :code="ValidationExampleCode" is-vertical>
			<template #content>
				<p>Automatic HTML5 validation on-blur.</p>
				<p>You can use <code>use-native-validation</code> prop to disable the default HTML5 validation.</p>
			</template>
			<template #component>
				<validation-example></validation-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Password" :code="PasswordExampleCode" is-vertical>
			<template #content>
				<p>You can use the <code>use-password-reveal</code> prop to hide a button that reveals the password.</p>
			</template>
			<template #component>
				<password-example></password-example>
			</template>
		</example-view>
		<b-horizontal-divider></b-horizontal-divider>
		<example-view title="Sizes" :code="SizeExampleCode" is-vertical>
			<template #component>
				<size-example></size-example>
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
import ExampleView from '../../../../../components/exampleView/ExampleView.vue';
import { apis } from './apis';
import PasswordExample from './examples/PasswordExample.vue';
import PasswordExampleCode from '!!raw-loader!./examples/PasswordExample.vue';
import SimpleExample from './examples/SimpleExample.vue';
import SimpleCode from '!!raw-loader!./examples/SimpleExample.vue';
import SizeExample from './examples/SizeExample.vue';
import SizeExampleCode from '!!raw-loader!./examples/SizeExample.vue';
import ValidationExample from './examples/ValidationExample.vue';
import ValidationExampleCode from '!!raw-loader!./examples/ValidationExample.vue';
import VariantsAndStatesExample from './examples/VariantsAndStatesExample.vue';
import VariantsAndStatesExampleCode from '!!raw-loader!./examples/VariantsAndStatesExample.vue';

export default defineComponent({
	name: 'input-documentation',
	components: {
		ApiView,
		SimpleExample,
		SizeExample,
		ExampleView,
		VariantsAndStatesExample,
		PasswordExample,
		ValidationExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			SimpleCode,
			VariantsAndStatesExampleCode,
			ValidationExampleCode,
			PasswordExampleCode,
			SizeExampleCode
		};
	}
});
</script>
