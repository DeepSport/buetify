<template>
  <router-view></router-view>
  <buetify-footer class="has-background-white-bis padding-top-size-1"></buetify-footer>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import BuetifyFooter from './components/buetifyFooter/BuetifyFooter.vue';

export default defineComponent({
	name: 'buetify',
	components: {
		BuetifyFooter
	},
  setup() {
    onMounted(() => document.dispatchEvent(new Event('custom-render-trigger')))  }
});
</script>

<style src="./assets/global.sass" lang="sass"></style>
