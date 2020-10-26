<template>
	<div>
		<buetify-home-navbar></buetify-home-navbar>
		<b-hero tag="main" class="is-primary is-fullheight-with-navbar">
			<b-hero-body>
				<b-container class="is-flex flex-direction-column justify-content-center align-items-center">
					<b-box class="main-box padding-size-1 has-background-primary-light is-inline-block">
						<h1 class="has-text-primary has-font-lobster main-title has-text-centered">
							Buetify
						</h1>
					</b-box>
					<b-subtitle class="is-size-4 has-text-centered-touch">
						<strong>Modular</strong> UI Components for
						<strong><a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue</a></strong> based on
						<strong><a href="http://bulma.io/" target="_blank" rel="noopener">Bulma</a></strong>
					</b-subtitle>
					<pre
						class="npm margin-top-size-4"
					><code><span class="is-unselectable">$ </span>yarn add buetify</code></pre>
					<div class="margin-top-size-4">
						<iframe
							src="https://ghbtns.com/github-btn.html?user=kightlingerh&repo=buetify&type=star&count=true&size=large"
							frameborder="0"
							scrolling="0"
							width="160px"
							height="30px"
						/>

						<iframe
							src="https://ghbtns.com/github-btn.html?user=kightlingerh&repo=buetify&type=fork&count=false&size=large"
							frameborder="0"
							scrolling="0"
							width="80px"
							height="30px"
						/>
					</div>
					<router-link custom to="/documentation/start">
						<template #default="{ href, navigate }">
							<b-button
								tag="a"
								class="margin-top-size-4"
								variant="is-primary"
								size="is-large"
								:href="href"
								@click="navigate"
							>
								Get Started
							</b-button>
						</template>
					</router-link>
				</b-container>
			</b-hero-body>
		</b-hero>
	</div>
</template>

<script lang="ts">
import BButton from 'buetify/lib/components/button/BButton';
import BBox from 'buetify/lib/components/layout/box/BBox';
import BContainer from 'buetify/lib/components/layout/container/BContainer';
import BHero from 'buetify/lib/components/layout/hero/BHero';
import BHeroBody from 'buetify/lib/components/layout/hero/BHeroBody';
import { defineComponent } from 'vue';
import BuetifyHomeNavbar from '../../components/buetifyNavbar/BuetifyHomeNavbar.vue';

export default defineComponent({
	name: 'home',
	components: {
		BBox,
		BuetifyHomeNavbar,
		BHero,
		BHeroBody,
		BContainer,
		BButton
	}
});
</script>

<style lang="sass">
.main-title
  font-size: 6rem
  +touch
    font-size: 4rem
.main-box
  max-width: 30rem
  border-radius: $size-1
  box-shadow: 0 6px 8px rgba($black, 0.2), 0 0 0 1px $link
.npm
  display: inline-flex
  font-size: 1.1em
  color: lighten($primary, 20%)
  background: darken($primary, 20%)
</style>
