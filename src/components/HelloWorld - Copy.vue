<template>
  <v-container>
    <!-- provides the ability to center and horizontally pad your site's contents. -->
    <v-row class="text-center">
      <!--Centers text on screen -->
      <v-col cols="12">
        <!-- Below is the code used to add UNA image into Home page -->
        <!--   <v-img          
                :src="require('../assets/UNALogo.png')"
                class="my-4"
                contain      
                height="200"
        />-->
      </v-col>

      <template>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                  <!--makes the text below bold -->
                  Welcome to the GradTracker
                </h1>
                <v-img :src="require('../assets/UNALogo.png')" class="my-4" contain height="200" />
              </v-col>
              <v-card-title>
                Student Search
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="5"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                  <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import db from "@/fb2";
export default {
  data() {
    return {
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
      //student: [],
      index: 0
    };
  },
  methods: {
    fbAddHandler(snapshot) {
      const item = snapshot.val();
      this.desserts.push(item);

      this.totalStudent += item.amount;
    }
  },
  mounted() {
    db.ref("Student").on("child_added", this.fbAddHandler);
  },
  /*return {
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
      students: []
    };*/ computed: {
    myStudents() {
      return this.Desserts.filter(desserts => {
        return (
          desserts.firstNAme === "The Net Ninja" &&
          desserts.status != "complete"
        );
      });
    }
  },
  created() {
    db.collection("Student").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.desserts.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script> 
