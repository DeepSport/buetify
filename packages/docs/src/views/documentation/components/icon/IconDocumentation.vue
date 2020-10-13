<template>
	<article>
		<section aria-label="differences with buetify" class="padding-bottom-size-6">
			<p>
				Buetify only provides a simple container for icons that applies Bulma's styling. This was done in order
				to simplify the implementation and remove the need for any global configuration. The examples shown
				below use only Font Awesome 5 SVG Icons, but everything should still work for other icon packs.
			</p>
		</section>
		<example-view title="Font Awesome" :code="FontAwesomeExampleCode" is-vertical>
			<template #content>
				<p>
					Buetify provides a helper: <code>useFontAwesomeIconComponent</code> that can be used to create
					Buetify icon components from a FontAwesome svg.
				</p>
			</template>
			<template #component>
				<font-awesome-example></font-awesome-example>
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
import FontAwesomeExample from './examples/FontAwesomeExample.vue';
import FontAwesomeExampleCode from '!!raw-loader!./examples/FontAwesomeExample.vue';
import { apis } from './api';

export default defineComponent({
	name: 'icon-documentation',
	components: {
		ApiView,
		ExampleView,
		FontAwesomeExample,
		BHorizontalDivider
	},
	setup() {
		return {
			apis,
			FontAwesomeExampleCode
		};
	}
});
</script>

<style lang="sass"></style>
