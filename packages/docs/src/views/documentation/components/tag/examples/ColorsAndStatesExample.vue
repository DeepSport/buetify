<template>
	<section aria-label="examples of available color variants and sizes for b-tag component">
		<b-tag-list>
			<b-tag variant="is-dark">Default</b-tag>
			<b-tag variant="is-primary" size="is-medium">Medium</b-tag>
			<b-tag variant="is-info" size="is-large">Large</b-tag>
		</b-tag-list>

		<b-tag-list>
			<b-tag variant="is-primary">Primary</b-tag>
			<b-tag variant="is-primary" class="is-light">Light primary</b-tag>

			<b-tag variant="is-success">Success</b-tag>
			<b-tag variant="is-success" class="is-light">Light success</b-tag>

			<b-tag variant="is-danger">Danger</b-tag>
			<b-tag variant="is-danger" class="is-light">Light danger</b-tag>

			<b-tag variant="is-warning">Warning</b-tag>
			<b-tag variant="is-warning" class="is-light">Light warning</b-tag>

			<b-tag variant="is-info">Info</b-tag>
			<b-tag variant="is-info" class="is-light">Light info</b-tag>

			<b-tag variant="is-link">Link</b-tag>
			<b-tag variant="is-link" class="is-light">Light link</b-tag>

			<br />
			<b-tag variant="is-light">Light</b-tag>

			<b-tag variant="is-dark">Dark</b-tag>
		</b-tag-list>
	</section>
</template>

<script lang="ts">
import BTag from 'buetify/lib/components/tag/BTag';
import BTagList from 'buetify/lib/components/tag/BTagList';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'tags-variants-and-sizes-example',
	components: {
		BTagList,
		BTag
	}
});
</script>
