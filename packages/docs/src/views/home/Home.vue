<template>
  <main>
    <buetify-navbar class="is-primary"></buetify-navbar>
    <b-hero class="is-primary is-fullheight-with-navbar">
      <b-hero-body>
        <b-container>
          <b-title>
            Buetify
          </b-title>
        </b-container>
      </b-hero-body>
    </b-hero>
  </main>
</template>

<script lang="ts">
import BContainer from 'buetify/lib/components/layout/container/BContainer';
import BHero from 'buetify/lib/components/layout/hero/BHero';
import BHeroBody from 'buetify/lib/components/layout/hero/BHeroBody';
import BTitle from 'buetify/lib/components/title/BTitle';
import { defineComponent } from 'vue'
import {BuetifyNavbar} from '../../components/buetifyNavbar';
export default defineComponent({
  name: "home",
  components: {
    BuetifyNavbar,
    BHero,
    BHeroBody,
    BContainer,
    BTitle
  }
})
</script>

