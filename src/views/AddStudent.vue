
<template>
  <v-app>
    <v-container fluid>
      <!-- provides the ability to center and horizontally pad your site's contents. -->
      <v-row>
        <v-col cols="12">
          <!-- Code below creates the card that contains or surrounds the form -->
          <v-card class="pa-sm-5 mx-lg-auto" color="white" width="95%" elevation="15">
            <v-card-text>
              <!-- Needed to insert the text onto the card -->
              <h1>
                <center>Add Student</center>
              </h1>
              <v-form class="px-3" ref="form">
                <!--Code below makes the input form for the users information -->
                <!-- we also added a max length of the string that can be entered to all input text -->
                <v-text-field
                  v-model="firstName"
                  :error-messages="nameErrors"
                  :counter="12"
                  maxlength="12"
                  label="First Name"
                  input="firstName"
                  blur="firstName"
                ></v-text-field>

                <v-text-field
                  v-model="lastName"
                  :error-messages="nameErrors"
                  :counter="12"
                  maxlength="12"
                  label="Last Name"
                  input="lastName"
                  blur="lastName"
                ></v-text-field>

                <v-text-field
                  v-model="studentID"
                  :error-messages="nameErrors"
                  :counter="13"
                  maxlength="13"
                  label="UNA Student ID"
                  input="studentID"
                  blur="studentID"
                ></v-text-field>

                <v-text-field v-model="major" label="Major" />

                <!--rules makes sure the email end in "@name.com" -->
                <v-text-field :rules="rules" v-model="email" label="UNA Email" type="email" />
                <br />
                <v-autocomplete
                  label="Expected Graduation Date?"
                  :items="semesters"
                  v-model="semestersChoice"
                  outlined
                  dense
                ></v-autocomplete>

                <v-text-field v-model="phone" label="Phone Number" />

                <!-- The code below creates the radio buttons that appear on the screen for un/employement -->
                <template>
                  <div>
                    <h3>Are You Currently Employed?</h3>
                    <!-- currently having trouble binding the data from the radio buttons to the db. 
                    would be something we worked on in the future-->
                    <v-radio-group v-model="choice">
                      <v-radio label="Yes" color="yellow" :key="Yes" :value="Yes"></v-radio>
                      <v-radio label="No" color="yellow" :key="No" :value="No"></v-radio>
                    </v-radio-group>
                  </div>
                </template>

                <v-text-field
                  v-model="employer"
                  :error-messages="nameErrors"
                  :counter="25"
                  maxlength="25"
                  label="Current Employer"
                  required
                  input=" employer "
                  blur=" employer "
                ></v-text-field>

                <v-text-field
                  v-model="position"
                  :error-messages="nameErrors"
                  :counter="20"
                  maxlength="20"
                  label="Current Position"
                  required
                  input=" position "
                  blur=" position "
                ></v-text-field>

                <v-file-input label="Attach profile picture" />
                <br />

                <!--This creates a drop down for the user to select the statement that fits them-->
                <h3>Which of the following best describes your PRIMARY status after graduation?</h3>
                <v-autocomplete
                  label="Check only ONE category."
                  :items="graduation"
                  v-model="graduationChoice"
                  outlined
                  dense
                ></v-autocomplete>

                <template>
                  <v-container fluid>
                    <v-row>
                      <h3>What is your idea career industry?</h3>
                      <v-col cols="12">
                        <!--creates the dropdown that has statements to be checked if it fits the user-->
                        <v-combobox
                          v-model="selected"
                          :items="items"
                          label="Check all that apply."
                          multiple
                          outlined
                          dense
                        ></v-combobox>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>

                <!--The v-menu component shows a menu at the position of the element used to activate it. -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" label="Birthday" prepend-icon readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>

                <!--Code below Creates the submit button and a pop-up that notifies the users info has been submitted -->
                <template>
                  <div class="text-center">
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ }">
                        <v-btn flat @click="submit" class="success mx-0 mt-3">Submit</v-btn>
                      </template>

                      <v-card>
                        <!-- displays a title for the pop-up after data has been submitted -->
                        <v-card-title class="headline grey lighten-2" primary-title>High Five!</v-card-title>

                        <v-card-text>
                          <!--displays message in the pop-up -->
                          Your entry into the database was successful. Thank you for submitting.
                        </v-card-text>
                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="yellow" text @click="dialog = false">Return</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import db2 from "@/fb";
export default {
  data() {
    return {
      student: {}
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const student = {
          firstName: this.firstName,
          lastName: this.lastName,
          studentID: this.studentID,
          major: this.major,
          email: this.email
        };
        db2
          .collection("Student")
          .add(student)
          .then(() => {
            console.log("added to db");
          });
      }
    }
  }
};
</script>


<script>
import db from "@/fb2";
export default {
  data: () => ({
    rules: [
      value => !!value || "Required.",
      value => (value || "").length <= 20 || "Max 20 characters",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    ],
    //variables to prevent errors
    firstName: "",
    lastName: "",
    studentID: "",
    major: "",
    email: "",
    phone: "",
    nameErrors: "",
    choice: 1,
    position: "",
    employer: "",
    dialog: false,
    birthday: [],
    semesters: ["Spring/Summer 2020", "December 2020"],
    selected: [],
    items: [
      "Work for a private sector firm/company",
      "Work for a nonprofit organization",
      "Work in the medical/healthcare sector",
      "Teach - elementary or secondary",
      "Teach - college",
      "Work for the federal government",
      "Work for the state and local government",
      "Military Career",
      "Own or manage a business",
      "Other"
    ],
    semestersChoice: [],
    graduationChoice: [],
    graduation: [
      "Employed full time in your discipline, or desired business field (on average 30 hours or more per week)",
      "Employed full time but not in your discipline (on average 30 hours or more per week)",
      "Employed part time (on average less than 30 hours per week)",
      "Participating in a volunteer or service program (e.g., Peace Corps)",
      "Serving in the US military",
      "Enrolled in a program of continuing education at this time (e.g., law school, graduate school, etc.)",
      "Seeking employment",
      "Planning to continue education but not yet enrolled",
      "Not seeking employment or continuing education at this time"
    ],
    //  picked: ["Yes", "No"],
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
    //submit button with db function on submit
    submit() {
      if (this.$refs.form.validate()) {
        const student = {
          firstName: this.firstName,
          lastName: this.lastName,
          studentID: this.studentID,
          major: this.major,
          email: this.email,
          phone: this.phone,
          employer: this.employer,
          birthday: this.date,
          choice: this.choice,
          semesters: this.semestersChoice,
          position: this.position,
          items: this.selected,
          graduation: this.graduationChoice
        };
        db.collection("Student")
          .add(student)
          .then(() => {
            console.log("added to db2");
          });
      }
    }
  }
};
</script> 