<template>
	<section aria-label="simple b-number-input examples">
    <b-field>
      <b-number-input v-model="number"></b-number-input>
    </b-field>

    <b-field label="Input with placeholder and min">
      <b-number-input v-model="numberPlaceholder" placeholder="99" :min="95"></b-number-input>
    </b-field>

    <b-field label="Input readonly">
      <b-number-input is-readonly></b-number-input>
    </b-field>

    <b-field label="Disabled">
      <b-number-input is-disabled></b-number-input>
    </b-field>

    <b-field label="Rounded">
      <b-number-input is-rounded></b-number-input>
    </b-field>

    <b-field label="Loading">
      <b-number-input is-loading></b-number-input>
    </b-field>

    <b-field label="Quantity" variant="is-danger" message="Quantity is invalid">
      <b-number-input></b-number-input>
    </b-field>

    <b-field label="Rate" variant="is-success" message="Rate is valid">
      <b-number-input></b-number-input>
    </b-field>
	</section>
</template>
<script lang="ts">
import BField from 'buetify/lib/components/form/field';
import BNumberInput from 'buetify/lib/components/form/numberInput/BNumberInput';
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
	name: 'simple-example',
	components: {
		BField,
		BNumberInput
	},
  setup() {
	  return {
	    number: shallowRef(0),
      numberPlaceholder: shallowRef<number | undefined>(undefined)
    }
  }
});
</script>
