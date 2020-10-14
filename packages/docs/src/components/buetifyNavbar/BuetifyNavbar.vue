<template>
	<b-app-header tag="div">
		<b-title class="is-size-1 has-font-lobster has-text-primary has-text-centered padding-size-6">Buetify</b-title>
	</b-app-header>
</template>

<script lang="ts">
import { BTitle } from 'buetify/lib/components';
import BAppHeader from 'buetify/lib/components/appHeader';
import { defineComponent } from 'vue';
// import GithubIcon from '../icons/GithubIcon';

export default defineComponent({
	name: 'buetify-navbar',
	components: {
		BAppHeader,
		// GithubIcon,
		BTitle
	}
});
</script>

<style lang="sass">
@font-face
  font-family: 'Lobster'
  src: url('~@/assets/Lobster-Regular.ttf') format('truetype')

.has-font-lobster
  font-family: 'Lobster', sans-serif
</style>
