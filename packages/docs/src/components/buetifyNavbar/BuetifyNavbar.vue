<template>
  <b-navbar>
    <b-navbar-brand>
      <b-navbar-item href="/" @click.prevent="goToHome">
        <b-title>DeepSport</b-title>
      </b-navbar-item>
      <b-navbar-item
        target="_blank"
        rel="noopener"
        href="https://github.com/DeepSport/buetify"
      >
        <github-icon></github-icon>
      </b-navbar-item>
    </b-navbar-brand>
    <b-navbar-menu :is-active="isOn">
      <b-navbar-end>
        <b-navbar-item href="/documentation" @click.prevent="goToDocumentation">
          Documentation
        </b-navbar-item>
      </b-navbar-end>
    </b-navbar-menu>
  </b-navbar>
</template>

<script lang="ts">
import {
  BNavbarBrand,
  BNavbar,
  BNavbarItem,
  BTitle,
  BNavbarStart,
  BNavbarEnd
} from "buetify/lib/components";
import { useToggle } from "buetify/lib/composables";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import GithubIcon from "../icons/GithubIcon";

export default defineComponent({
  name: "buetify-navbar",
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarItem,
    GithubIcon,
    BNavbarEnd
  },
  setup() {
    const router = useRouter();
    const toggle = useToggle({ isOpen: false, hasPopup: true }, "isOpen");

    function goToHome() {
      router.push("/").then(toggle.setOff);
    }
    function goToDocumentation() {
      router.push("/documentation").then(toggle.setOff);
    }

    return {
      goToHome,
      goToDocumentation,
      ...toggle
    };
  }
});
</script>
