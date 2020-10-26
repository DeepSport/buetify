<template>
	<b-navbar class="is-spaced is-primary has-shadow">
		<b-navbar-brand>
			<router-link to="/" custom>
				<template #default="{ href, navigate}">
					<b-navbar-item tag="a" :href="href" @click="navigate">
						<b-title class="is-size-1 is-size-3-touch has-font-lobster has-text-centered">Buetify</b-title>
					</b-navbar-item>
				</template>
			</router-link>
			<b-navbar-burger :class="{ 'is-active': isOn }" @click="toggle"> </b-navbar-burger>
		</b-navbar-brand>
		<b-navbar-menu :class="{ 'is-active': isOn }">
			<b-navbar-end>
				<router-link to="/documentation" custom>
					<template #default="{ isActive, href, navigate }">
						<a
							:href="href"
							@click="navigate"
							class="navbar-item is-large"
							:class="{ 'has-text-link': isActive }"
							>Documentation</a
						>
					</template>
				</router-link>
				<a
					class="navbar-item is-large"
					href="https://github.com/DeepSport/buetify"
					target="_blank"
					rel="noopener"
				>
					<github-icon size="is-medium"></github-icon>
				</a>
			</b-navbar-end>
		</b-navbar-menu> </b-navbar
></template>

<script lang="ts">
import { BNavbarMenu, BTitle } from 'buetify/lib/components';
import BNavbar from 'buetify/lib/components/navbar/BNavbar';
import BNavbarBrand from 'buetify/lib/components/navbar/BNavbarBrand';
import BNavbarBurger from 'buetify/lib/components/navbar/BNavbarBurger';
import BNavbarEnd from 'buetify/lib/components/navbar/BNavbarEnd';
import BNavbarItem from 'buetify/lib/components/navbar/BNavbarItem';
import { useToggle } from 'buetify/lib/composables';
import { defineComponent } from 'vue';
import GithubIcon from '../icons/GithubIcon';

export default defineComponent({
	name: 'buetify-navbar',
	components: {
		BNavbar,
		BNavbarItem,
		BNavbarBrand,
		BNavbarBurger,
		BNavbarMenu,
		BNavbarEnd,
		GithubIcon,
		BTitle
	},
	setup() {
		return useToggle({ isActive: false, hasPopup: true }, 'isActive');
	}
});
</script>
