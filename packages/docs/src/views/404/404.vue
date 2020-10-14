<template>
	<div>
		<buetify-documentation-navbar></buetify-documentation-navbar>
		<b-hero tag="main" class="is-fullheight-with-navbar is-light">
			<b-hero-body class="hero-body">
				<b-container class="has-text-centered">
					<sad-tear-icon size="is-large" variant="is-primary"></sad-tear-icon>
					<b-title>
						Hmm, we can't find the page you are looking for
					</b-title>
					<router-link custom to="/">
						<template #default="{ navigate, href }">
							<b-button tag="a" :href="href" @click="navigate" variant="is-primary">
								Go to Home
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
import BContainer from 'buetify/lib/components/layout/container/BContainer';
import BHero from 'buetify/lib/components/layout/hero/BHero';
import BHeroBody from 'buetify/lib/components/layout/hero/BHeroBody';
import BTitle from 'buetify/lib/components/title/BTitle';
import { defineComponent } from 'vue';
import BuetifyDocumentationNavbar from '../../components/buetifyNavbar/BuetifyDocumentationNavbar.vue';
import SadTearIcon from '../../components/icons/SadTearIcon';

export default defineComponent({
	name: 'not-found',
	components: {
		BuetifyDocumentationNavbar,
		BHero,
		BHeroBody,
		BContainer,
		SadTearIcon,
		BTitle,
		BButton
	}
});
</script>
