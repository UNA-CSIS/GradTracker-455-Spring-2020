<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-md-6 mx-lg-auto" color="white" width="50%">
            <v-card-text>
              <h1><center>Sample Form</center></h1>
              <v-form form @submit.stop.prevent="submit">
                <v-text-field label="Email" type="email" />
                <v-text-field label="First Name" />
                <v-text-field label="Last Name" />
                <v-autocomplete
                  label="Which browser do you use?"
                  :items="browsers"
                ></v-autocomplete>
                <v-file-input label="Attach profile picture" />

                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Birthday"
                      prepend-icon=""
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>

                <v-checkbox label="Agree to terms & conditions" />
                <v-btn type="submit" on-click="submit()" color="primary"
                  >Submit</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    birthday: "",
    browsers: ["Chrome", "Firefox", "Safari", "Edge"],
    date: null,
    menu: false
  }),
  // date picker settings
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    submit() {}
  }
};
</script>
