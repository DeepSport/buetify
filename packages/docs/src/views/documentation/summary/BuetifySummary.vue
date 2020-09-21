<template>
	<article class="content" aria-label="summary of buetify">
		<p>
			Buetify is a modular and lightweight library of responsive UI components for
			<a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a> incorporating the
			<a href="http://bulma.io/" target="_blank" rel="noopener">Bulma</a> framework and design.
		</p>
		<h2>Work in Progress</h2>
		<p>
			This is a work in progress and is meant to be used with Vue 3. I started Buetify in order to gain a better
			understanding of design principles, accessibility and Vue. It initially started as a fork of
			<a href="https://buefy.org/" target="_blank" rel="noopener">Buefy</a> which is awesome and what should be
			used in a production setting. This library also includes a lot of ideas from Vuetify in terms of
			accessibility and how to incorporate typescript into a Vue project.
		</p>
		<h2>
			Differences from Buefy
		</h2>
		<h3>Main Differences</h3>
		<ul>
			<li>Written in Typescript</li>
			<li>Uses only render functions to maximize type safety</li>
			<li>Has built in light / dark theme functionality</li>
			<li>Completely tree-shakeable. Use only what you need</li>
		</ul>

		<h3>Small Differences</h3>
		<ul>
			<li>
				Requires all components to be nested inside a <code>b-app</code> component for themes, notifications,
				and modals to work properly
			</li>
			<li>
				Requires additional webpack config such that sass variables are prepended to all sass files. This
				prevents the need from importing all sass upfront
			</li>
			<li>
				Small differences in naming conventions, e.g. <code>variant</code> rather than <code>type</code> for
				color props
			</li>
      <li>
        Icons need to be passed as vue components rather than strings. This was done to simplify how icons are handled. Default icons are provided.
      </li>
		</ul>
	</article>
</template>

<script lang="ts">
import 'bulma/sass/elements/content.sass';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'buetify-summary'
});
</script>

<style lang="sass"></style>
