<template>
  <section
    aria-label="examples of available color variants for b-button component"
  >
    <div class="buttons">
      <b-button variant="is-primary">Primary</b-button>
      <b-button variant="is-primary is-light">Primary Light</b-button>

      <b-button variant="is-success">Success</b-button>
      <b-button variant="is-success is-light">Success Light</b-button>

      <b-button variant="is-danger">Danger</b-button>
      <b-button variant="is-danger is-light">Danger Light</b-button>

      <b-button variant="is-warning">Warning</b-button>
      <b-button variant="is-warning is-light">Warning Light</b-button>

      <b-button variant="is-info">Info</b-button>
      <b-button variant="is-info is-light">Info Light</b-button>

      <b-button variant="is-link">Link</b-button>
      <b-button variant="is-link is-light">Link Light</b-button><br />

      <b-button variant="is-light">Light</b-button>
      <b-button variant="is-dark">Dark</b-button>
      <b-button variant="is-text">Text</b-button>
    </div>

    <div class="buttons">
      <b-button>Normal</b-button>
      <b-button is-disabled>Disabled</b-button>
      <b-button is-loading>Loading</b-button>
      <b-button is-rounded>Rounded</b-button>
      <b-button is-focused>Focused</b-button>
      <b-button is-hovered>Hovered</b-button>
      <b-button is-selected>Selected</b-button>
      <b-button is-active>Active</b-button>
    </div>

    <div class="buttons">
      <b-button variant="is-primary" is-outlined>Outlined</b-button>
      <b-button variant="is-success" is-outlined>Outlined</b-button>
      <b-button variant="is-danger" is-outlined>Outlined</b-button>
      <b-button variant="is-warning" is-outlined>Outlined</b-button>
    </div>

    <div class="buttons">
      <b-button variant="is-primary" is-expanded>Expanded</b-button>
    </div>

    <div class="notification is-primary">
      <div class="buttons">
        <b-button variant="is-primary" is-inverted>Inverted</b-button>
        <b-button variant="is-primary" is-inverted is-outlined
          >Invert Outlined</b-button
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { BButton } from "buetify/lib/components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "button-variants-example",
  components: {
    BButton
  }
});
</script>
