
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
                  <v-text-field v-model="editedItem.name" label="First Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Last Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Student ID"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.gradYear" label="Graduation Year"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Birthday"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.major" label="Major"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Emplyed"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.employer" label="Employer"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="Position"></v-text-field>
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
import db from "@/fb2";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "First Name",
          align: "start",
          sortable: true,
          value: "firstName"
        },
        { text: "Last Name", value: "lastName", sortable: true },
        { text: "Student ID", value: "studentID", sortable: true },
        { text: "Graduation Year", value: "semesters", sortable: true },
        { text: "Phone Number", value: "phone", sortable: false },
        { text: "Birthday", value: "birthday", sortable: true },
        { text: "Email", value: "email", sortable: false },
        { text: "Major", value: "major", sortable: true },
        { text: "Employed", value: "employed", sortable: true },
        { text: "Employer", value: "employer", sortable: true },
        { text: "Position", value: "position", sortable: true },
        { text: "Edit/Delete", value: "actions", sortable: false }
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        firstName: "",
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
  methods: {
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
  },
  // }
  // Pull updated data from database
  created() {
    db.collection("Student").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.students.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  } // end created
}; // end export default
</script>

