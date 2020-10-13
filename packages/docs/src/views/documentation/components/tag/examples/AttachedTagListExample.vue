<template>
	<section aria-label="b-tag-list attached example">
		<b-tag-list is-attached>
			<b-tag variant="is-dark">npm</b-tag>
			<b-tag variant="is-info">0.1.0</b-tag>
		</b-tag-list>
	</section>
</template>
<script lang="ts">
import BTag from 'buetify/lib/components/tag/BTag';
import BTagList from 'buetify/lib/components/tag/BTagList';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'tag-list-attached-example',
	components: {
		BTag,
		BTagList
	}
});
</script>
