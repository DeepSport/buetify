<template>
	<section aria-label="simple tag example">
		<div class="block">
			<b-tag>
				Tag Label
			</b-tag>
		</div>
		<div class="block">
			<b-tag is-rounded>
				Rounded Tag Label
			</b-tag>
		</div>
	</section>
</template>
<script lang="ts">
import BTag from 'buetify/lib/components/tag/BTag';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'simple-tag-example',
	components: {
		BTag
	}
});
</script>
