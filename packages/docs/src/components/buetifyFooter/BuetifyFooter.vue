<template>
	<footer>
		<b-container class="padding-size-1">
			<b-content class="content">
				<b-columns class="columns">
					<b-column class="content">
						<p>
							<small>
								Buetify's source code is licensed under
								<a
									class="has-text-link"
									href="http://opensource.org/licenses/mit-license.php"
									target="_blank"
									rel="noopener"
									>MIT</a
								>.
							</small>
						</p>
						<p>
							<small>
								This site is powered by
								<a class="has-text-link" target="_blank" rel="noopener" href="https://www.netlify.com"
									>Netlify</a
								>
							</small>
						</p>
					</b-column>

					<b-column>
						<router-link to="/" exact class="navbar-item has-text-weight-semibold">
							Home
						</router-link>

						<router-link to="/documentation" class="navbar-item has-text-weight-semibold">
							Documentation
						</router-link>
					</b-column>
				</b-columns>
			</b-content>
		</b-container>
	</footer>
</template>

<script lang="ts">
import BColumn from 'buetify/lib/components/layout/columns/BColumn';
import BColumns from 'buetify/lib/components/layout/columns/BColumns';
import BContainer from 'buetify/lib/components/layout/container/BContainer';
import BContent from 'buetify/lib/components/layout/content/BContent';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'buetify-footer',
	components: {
		BContainer,
		BContent,
		BColumns,
		BColumn
	}
});
</script>

<style lang="sass"></style>
