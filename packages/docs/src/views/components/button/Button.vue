<template>
  <article>
    <example-view title="Colors" :code="ButtonVariantsExampleCode" is-vertical>
      <template #component>
        <button-variants-example></button-variants-example>
      </template>
    </example-view>
    <api-view
        :apis="apis"
        :code="ButtonVariantsExampleCode"
    >
    </api-view>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {ApiView} from '../../../components/apiView';
import ExampleView from '../../../components/exampleView/ExampleView.vue';
import ButtonVariantsExample from './ButtonVariantsExample.vue';
import ButtonVariantsExampleCode from '!!raw-loader!./ButtonVariantsExample.vue';

import {BUTTON_APIS} from './api';
export default defineComponent({
  name: "Button",
  components: {
    ExampleView,
    ButtonVariantsExample,
    ApiView
  },
  setup() {
    return {
      apis: BUTTON_APIS,
      ButtonVariantsExampleCode
    }
  }
});
</script>

<style lang="sass"></style>
