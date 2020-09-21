<template>
	<section aria-label="accordion example">
    <b-accordion>
      <template #title>
        Accordion
      </template>
      <template #default>
        Content to display
      </template>
    </b-accordion>
	</section>
</template>
<script lang="ts">
import BAccordion from 'buetify/lib/components/accordion/BAccordion';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'accordion-example',
	components: {
		BAccordion
	}
});
</script>
