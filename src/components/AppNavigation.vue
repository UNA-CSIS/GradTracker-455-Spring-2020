<template>
  <v-app>
    <!-- Vuetify requires the use of the v-app component. It is the center point for much of the frameworks functionality -->

    <!-- create navigation bar -->
    <v-app-bar app color="#7B1FA2" darken-2 text-color="yellow">
      <v-flex purple darken-2 py-4 text-left White--text>
        <!--shifts text on the app bar to the left -->
        <v-toolbar-title>Grad Tracker</v-toolbar-title>
        <!-- Adds the text for the title of the home page to the app-bar -->
      </v-flex>
      <v-spacer></v-spacer>
      <!-- loops through links array to produce buttons -->
      <v-btn
        color="#FFEB3B"
        v-for="link in links"
        v-bind:key="`${link.label}-header-link`"
        text
        tile
        v-bind:to="link.url"
      >
        {{ link.label }}
        <!--Outputs the name of the link on the button created-->
      </v-btn>

      <!-- <input type="text" placeholder="Search Student" name="search">-->
      <!-- Will be used to be able to search grads in the database.-->
    </v-app-bar>

    <v-content>
      <!-- loads all pages in routes -->
      <router-view></router-view>
    </v-content>
    <!-- create page footer -->
    <v-footer color="#7B1FA2" darken-2 padless>
      <!-- removes all padding from the footer -->
      <v-layout justify-center wrap>
        <v-flex
          darken-2
          py-4
          text-center
          Black--text
        >{{ new Date().getFullYear() }} — Powered by UNA CSIS</v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      links: [
        {
          label: "Home",
          url: "/"
        },
        {
          label: "Add Student",
          url: "/AddStudent"
        }
      ]
    };
  }
};
</script>
