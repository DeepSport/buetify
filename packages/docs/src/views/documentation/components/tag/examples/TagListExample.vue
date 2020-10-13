<template>
	<section aria-label="b-tag-list example">
		<b-tag-list>
			<b-tag variant="is-info">First</b-tag>
			<b-tag variant="is-info">Second</b-tag>
			<b-tag variant="is-info">Third</b-tag>
			<b-tag variant="is-info">Fourth</b-tag>
			<b-tag variant="is-info">Fifth</b-tag>
		</b-tag-list>
	</section>
</template>
<script lang="ts">
import BTag from 'buetify/lib/components/tag/BTag';
import BTagList from 'buetify/lib/components/tag/BTagList';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'tag-list-example',
	components: {
		BTag,
		BTagList
	}
});
</script>
