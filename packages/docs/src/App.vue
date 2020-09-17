<template>
  <b-app :is-themeable="false">
    <template #header>
      <buetify-navbar></buetify-navbar>
    </template>
    <template #navigation-drawer>
      <buetify-sidebar class="is-fullheight"></buetify-sidebar>
    </template>
    <template #default>
      <router-view></router-view>
    </template>
  </b-app>
</template>

<script lang="ts">
import {BApp} from 'buetify/lib/components';
import { defineComponent } from 'vue';
import BuetifyNavbar from './components/buetifyNavbar/BuetifyNavbar.vue';
import BuetifySidebar from './components/buetifySidebar/BuetifySidebar.vue';

export default defineComponent({
  name: 'buetify',
  components: {
    BApp,
    BuetifySidebar,
    BuetifyNavbar
  }
})
</script>

<style src="./assets/global.sass" lang="sass"></style>
