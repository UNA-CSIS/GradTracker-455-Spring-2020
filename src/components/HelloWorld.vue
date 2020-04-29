<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :search="search"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <h1 class="display-2 font-weight-bold mb-3 text-center">
        <!--makes the text below bold -->
        Welcome to the GradTracker
      </h1>
      <v-img :src="require('../assets/UNALogo.png')" class="my-4" contain height="200" />

      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Student Search"
          single-line
          hide-details
          text-center
        ></v-text-field>
      </v-card-title>

      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.gradYear" label="Graduation Year"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.major" label="Major"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.employer" label="Employer"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple" text @click="close">Cancel</v-btn>
              <v-btn color="purple" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>




<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "Graduation Year", value: "gradYear", sortable: true },
        { text: "Phone Number", value: "phone", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Major", value: "major", sortable: true },
        { text: "Employer", value: "employer", sortable: true },
        { text: "Edit/Delete", value: "actions", sortable: false }
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        gradYear: -1,
        phone: "",
        email: "",
        major: "",
        employer: ""
      },
      defaultItem: {
        name: "",
        gradYear: 0,
        phone: "",
        email: "",
        major: "",
        employer: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.students = [
        {
          name: "Jim Jackson",
          gradYear: 2016,
          phone: "256-493-3443",
          email: "johndoe@email.com",
          major: "art",
          employer: "UNA"
        },
        {
          name: "Kendra Montgomery",
          gradYear: 2014,
          phone: "931-555-8969",
          email: "johndoe@email.com",
          major: "criminal justice",
          employer: "None"
        },
        {
          name: "Michael Turner",
          gradYear: 2012,
          phone: "931-555-1154",
          email: "johndoe@email.com",
          major: "finance",
          employer: "SAIC"
        },
        {
          name: "Bill Turner",
          gradYear: 2020,
          phone: "256-555-1548",
          email: "johndoe@email.com",
          major: "accounting",
          employer: "Netflix"
        },
        {
          name: "Kobe Bryant",
          gradYear: 2011,
          phone: "631-545-5486",
          email: "johndoe@email.com",
          major: "pre-med",
          employer: "None"
        },
        {
          name: "Jelly Bean",
          gradYear: 2014,
          phone: "631-249-6545",
          email: "johndoe@email.com",
          major: "computer science",
          employer: "Hexagon"
        },
        {
          name: "Lebron James",
          gradYear: 2019,
          phone: "256-777-6543",
          email: "johndoe@email.com",
          major: "public relations",
          employer: "None"
        },
        {
          name: "Kevin Durant",
          gradYear: 2013,
          phone: "256-777-8598",
          email: "johndoe@email.com",
          major: "crminal justice",
          employer: "Madison City"
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.students.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.students.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        this.student.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>