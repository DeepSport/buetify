<template>
	<section aria-label="b-tag-list grouped example">
		<b-field is-grouped is-grouped-multiline>
			<p class="control">
				<b-tag-list is-attached>
					<b-tag variant="is-dark">npm</b-tag>
					<b-tag variant="is-info">0.1.0</b-tag>
				</b-tag-list>
			</p>
			<p class="control">
				<b-tag-list is-attached>
					<b-tag variant="is-dark">downloads</b-tag>
					<b-tag variant="is-success">0.5k</b-tag>
				</b-tag-list>
			</p>
			<p class="control">
				<b-tag-list is-attached>
					<b-tag variant="is-dark">chat</b-tag>
					<b-tag variant="is-primary">discord</b-tag>
				</b-tag-list>
			</p>
		</b-field>
		<b-field is-grouped is-grouped-multiline>
			<p class="control">
				<b-tag is-attached is-closable variant="is-primary">
					Bulma
				</b-tag>
			</p>

			<p class="control">
				<b-tag is-attached is-closable variant="is-primary">
					Vue
				</b-tag>
			</p>

			<p class="control">
				<b-tag is-attached is-closable variant="is-primary">
					CSS
				</b-tag>
			</p>
		</b-field>
	</section>
</template>
<script lang="ts">
import BField from 'buetify/lib/components/form/field';
import BTag from 'buetify/lib/components/tag/BTag';
import BTagList from 'buetify/lib/components/tag/BTagList';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'tag-list-grouped-example',
	components: {
		BTag,
		BTagList,
		BField
	}
});
</script>
