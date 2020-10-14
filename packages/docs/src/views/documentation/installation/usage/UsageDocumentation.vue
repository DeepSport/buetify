<template>
	<div>
		<b-message variant="is-info" size="is-medium">
			All Buetify components must be housed within a <code>b-app</code> component
		</b-message>
		<div class="content">
			<p>
				The <code>b-app</code> component is used to display modals, notifications, snackbars, toasts, etc. It
				also provides logic for opening / closing the sidebar to nested components.
			</p>
		</div>
		<b-horizontal-divider></b-horizontal-divider>
		<code-view :code="UsageExampleCode" :use-toggle="false"></code-view>
	</div>
</template>

<script lang="ts">
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import BMessage from 'buetify/lib/components/message/BMessage';
import { defineComponent } from 'vue';
import CodeView from '../../../../components/codeView/CodeView.vue';
import UsageExampleCode from '!!raw-loader!./UsageExample.vue';

export default defineComponent({
	name: 'start-documentation',
	components: {
		CodeView,
		BHorizontalDivider,
		BMessage
	},
	setup() {
		return {
			UsageExampleCode
		};
	}
});
</script>

<style lang="sass"></style>
