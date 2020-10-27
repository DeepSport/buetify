<template>
	<section aria-label="closable tag example">
		<div class="field">
			<b-tag v-if="isActive.a" variant="is-primary" is-closable @close="close('a')">
				Colored closable tag label
			</b-tag>
		</div>
		<div class="field">
			<b-tag v-if="isActive.b" variant="is-success" is-closable close-variant="is-danger" @close="close('b')">
				Success tag w/ danger close
			</b-tag>
		</div>

		<div class="field">
			<b-tag v-if="isActive.c" is-attached is-closable @close="close('c')">
				Attached closable tag label
			</b-tag>
		</div>
		<div class="field">
			<b-tag v-if="isActive.d" variant="is-danger" is-attached is-closable @close="close('d')">
				Colored attached closable tag label
			</b-tag>
		</div>
		<div class="field">
			<b-tag v-if="isActive.e" close-variant="is-danger" is-attached is-closable @close="close('e')">
				Attached label with danger close
			</b-tag>
		</div>
	</section>
</template>
<script lang="ts">
import BTag from 'buetify/lib/components/tag/BTag';
import { defineComponent, reactive } from 'vue';
export default defineComponent({
	name: 'closable-tag-example',
	components: {
		BTag
	},
	setup() {
		const isActive = reactive({
			a: true,
			b: true,
			c: true,
			d: true,
			e: true
		});
		function close(key: keyof typeof isActive) {
			isActive[key] = false;
		}

		return {
			isActive,
			close
		};
	}
});
</script>
