<template>
	<div>
		<b-message variant="is-warning" size="is-medium">
			Buetify requires
			<strong><a href="https://v3.vuejs.org" target="_blank">Vue.js</a> version 3.0.0+</strong>.
		</b-message>

		<b-media>
			<b-media-left>
				<b-title id="installation">
					<router-link to="#installation">#</router-link>
				</b-title>
			</b-media-left>
			<b-media-content>
				<b-title class="padding-bottom-size-6">Installation</b-title>
				<b-subtitle tag="p" class="subtitle is-spaced"
					>After creating a project with vue-cli or custom-made (usually Webpack)</b-subtitle
				>
				<p class="title is-4">Installation</p>
				<code-view code="yarn add buetify" lang="bash" is-expanded :use-toggle="false" />
			</b-media-content>
		</b-media>
		<b-horizontal-divider></b-horizontal-divider>
		<b-media>
			<b-media-left>
				<b-title id="configuration">
					<router-link to="#configuration">#</router-link>
				</b-title>
			</b-media-left>
			<b-media-content>
				<b-title>Configuration</b-title>
				<div class="content">
					<p>There are 4 steps to configure Buetify</p>
					<ol>
						<li>Create a <code>variables.sass</code> file and import Bulma's and Buetify's variables.</li>
						<li>
							Configure Webpack to prepend your <code>variables.sass</code> file to all sass files in your
							project. This removes the need to import all your sass upfront which could hinder initial
							load times.
						</li>
						<li>
							Create a <code>global.sass</code> file to import Bulma's basic styles and to house any of
							your own global styles
						</li>
						<li>Import your <code>global.sass</code> file inside your main.js file.</li>
					</ol>
				</div>

				<code-view title="1. (Variables)" :code="VariablesCode" lang="bash" is-expanded :use-toggle="false" />
				<code-view
					title="2. (w/ Vue)"
					:code="VueConfigCode"
					lang="typescript"
					is-expanded
					:use-toggle="false"
				/>
				<code-view
					title="2. (w/ Webpack)"
					:code="WebpackConfigCode"
					lang="typescript"
					is-expanded
					:use-toggle="false"
				/>

				<b-message variant="is-info">
					<strong>Note: </strong> You only need to do one of the Vue / Webpack configurations depending on how
					you set up your project.
				</b-message>

				<code-view title="3. (Global)" :code="GlobalCode" lang="bash" is-expanded :use-toggle="false" />

				<code-view title="4. (Main)" :code="MainCode" lang="bash" is-expanded :use-toggle="false" />
			</b-media-content>
		</b-media>
	</div>
</template>

<script lang="ts">
import BHorizontalDivider from 'buetify/lib/components/layout/divider/BHorizontalDivider';
import BMedia from 'buetify/lib/components/layout/media/BMedia';
import BMediaContent from 'buetify/lib/components/layout/media/BMediaContent';
import BMediaLeft from 'buetify/lib/components/layout/media/BMediaLeft';
import BMessage from 'buetify/lib/components/message/BMessage';
import BSubtitle from 'buetify/lib/components/title/BSubtitle';
import BTitle from 'buetify/lib/components/title/BTitle';
import { defineComponent } from 'vue';
import CodeView from '../../../../components/codeView/CodeView.vue';
import GlobalCode from '!!raw-loader!./global.sass';
import MainCode from '!!raw-loader!./main';
import VariablesCode from '!!raw-loader!./variables.sass';
import WebpackConfigCode from '!!raw-loader!./webpack.config';
import VueConfigCode from '!!raw-loader!./vue.config';

export default defineComponent({
	name: 'start-documentation',
	components: {
		BMedia,
		BMediaLeft,
		BMediaContent,
		CodeView,
		BHorizontalDivider,
		BMessage,
		BTitle,
		BSubtitle
	},
	setup() {
		return {
			GlobalCode,
			VariablesCode,
			WebpackConfigCode,
			VueConfigCode,
			MainCode
		};
	}
});
</script>

<style lang="sass"></style>
