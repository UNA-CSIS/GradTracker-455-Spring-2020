<template>
  <v-app>
    <!-- insert navigation component -->
    <app-navigation></app-navigation>
  </v-app>
</template>

<script>
import AppNavigation from "@/components/AppNavigation.vue";
export default {
  name: "App",
  components: {
    AppNavigation // converted to app-navigation for insertion into html
  }
};
</script>

<style></style>