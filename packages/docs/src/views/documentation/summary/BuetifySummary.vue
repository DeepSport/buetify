<template>
	<article aria-label="summary of buetify">
		<b-message variant="is-info">
			This documentation assumes you have at least a basic knowledge of Vue. If you don't, head over to
			<a href="https://v3.vuejs.org" target="_blank">Vue</a> first before starting here. You will be much better
			off.
		</b-message>
		<div class="content">
			<p>
				Buetify is a modular library of responsive UI components for
				<a class="has-text-link" href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a>
				incorporating the
				<a class="has-text-link" href="http://bulma.io/" target="_blank" rel="noopener">Bulma</a> framework and
				design.
			</p>
			<h2>Work in Progress</h2>
			<p>
				This is a work in progress and is meant to be used with Vue 3. I started Buetify in order to gain a
				better understanding of design principles, accessibility and Vue. It began as a fork of
				<a href="https://buefy.org/" target="_blank" rel="noopener">Buefy</a> which is awesome and what should
				be used in a production setting. This library also includes many concepts from Vuetify in terms of
				accessibility and how to incorporate typescript into a Vue project.
			</p>
			<h2>
				Differences from Buefy
			</h2>
			<h3>Main Differences</h3>
			<ul>
				<li>Written in Typescript</li>
				<li>Uses only render functions to maximize type safety</li>
				<!--			<li>Has built in light / dark theme functionality</li>-->
				<li>Completely tree-shakeable. Use only what you need</li>
			</ul>

			<h2>Small Differences</h2>
			<ul>
				<li>
					Requires all components to be nested inside a <code>b-app</code> component for the sidebar,
					notifications, and modals to work properly
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
					Icons need to be passed as vue components rather than strings. This was done to simplify how icons
					are handled. Default icons are provided.
				</li>
			</ul>
			<p>
				Other than these small differences, Buetify should look and appear to be very similar to Buefy and that
				is by design! All the styling should be close to identical. The biggest differences are in the
				implementation.
			</p>
		</div>
	</article>
</template>

<script lang="ts">
import 'bulma/sass/elements/content.sass';
import BMessage from 'buetify/lib/components/message/BMessage';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'buetify-summary',
	components: {
		BMessage
	}
});
</script>

<style lang="sass"></style>
