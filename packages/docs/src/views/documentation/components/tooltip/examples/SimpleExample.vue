<template>
	<section aria-label="b-tooltip examples" class="b-tooltips">
		<b-tooltip label="Right" position="is-right">
			<b-button variant="is-dark">
				Right
			</b-button>
		</b-tooltip>
		<b-tooltip label="Top">
			<b-button variant="is-dark">
				Top (Default)
			</b-button>
		</b-tooltip>
		<b-tooltip label="Bottom" position="is-bottom">
			<b-button variant="is-dark">
				Bottom
			</b-button>
		</b-tooltip>
		<b-tooltip label="Left" position="is-left">
			<b-button variant="is-dark">
				Left
			</b-button>
		</b-tooltip>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BTooltip from 'buetify/lib/components/tooltip';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'simple-tooltips-example',
	components: {
		BTooltip,
		BButton
	}
});
</script>
