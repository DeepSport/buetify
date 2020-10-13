<template>
	<section aria-label="b-tooltip is-multilined examples" class="b-tooltips">
		<b-tooltip label="Tooltip is-multilined, probably because it's too long for a casual tooltip" is-multiline>
			<b-button variant="is-dark">
				Multiline (Default)
			</b-button>
		</b-tooltip>
		<b-tooltip label="It's not brief, but it's also not long" size="is-small" is-multiline>
			<b-button variant="is-dark">
				Small
			</b-button>
		</b-tooltip>
		<b-tooltip
			label="Tooltip large is-multilined, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
			size="is-large"
			is-multiline
		>
			<b-button variant="is-dark">
				Large
			</b-button>
		</b-tooltip>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BTooltip from 'buetify/lib/components/tooltip';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'multilined-tooltips-example',
	components: {
		BTooltip,
		BButton
	}
});
</script>
