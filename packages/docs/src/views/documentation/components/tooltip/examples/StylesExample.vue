<template>
	<section aria-label="b-tooltip styles examples" class="b-tooltips">
		<b-tooltip label="Has dashed trigger text" is-dashed>
			Dashed Text
		</b-tooltip>
		<b-tooltip label="No animation" :is-animated="false">
			<b-button>
				No Animation
			</b-button>
		</b-tooltip>
		<b-tooltip label="Hello Darkness " variant="is-dark">
			<b-button>
				Dark
			</b-button>
		</b-tooltip>
		<b-tooltip label="Say hello to the light" variant="is-light" position="is-bottom">
			<b-button>
				Light
			</b-button>
		</b-tooltip>
		<b-tooltip label="I will never close" is-always>
			<b-button>
				Always
			</b-button>
		</b-tooltip>
		<b-tooltip label="I have squared corners" is-square position="is-bottom">
			<b-button>
				Square
			</b-button>
		</b-tooltip>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BTooltip from 'buetify/lib/components/tooltip';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'tooltips-styles-example',
	components: {
		BTooltip,
		BButton
	}
});
</script>
