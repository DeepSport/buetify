<template>
	<section aria-label="b-fields responsive groups example">
		<b-field is-grouped is-grouped-multiline="">
      <p v-for="i in 25" :key="i" class="control">
        <b-button>
          {{ i }}
        </b-button>
      </p>
    </b-field>
	</section>
</template>
<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BField from 'buetify/lib/components/form/field';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'field-response-groups-example',
	components: {
		BField,
		BButton
	},
});
</script>
