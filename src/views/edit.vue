<template>
  <v-row class="text-center">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center">Update Student</h3>
        <form @submit.prevent="onUpdateForm">
          <div class="form-group">
            <label>First name</label>
            <input type="text" class="form-control" v-model="student.firstName" required />
          </div>

          <div class="form-group">
            <label>Last name</label>
            <input type="text" class="form-control" v-model="student.lastName" required />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="student.email" required />
          </div>

          <div class="form-group">
            <label>Student ID (L-number)</label>
            <input type="text" class="form-control" v-model="student.studentID" required />
          </div>

          <div class="form-group">
            <label>Major</label>
            <input type="text" class="form-control" v-model="student.major" required />
          </div>

          <div class="form-group">
            <label>Phone number</label>
            <input type="text" class="form-control" v-model="student.phone" required />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block">Update Student</button>
          </div>
        </form>
      </div>
    </div>
  </v-row>
</template>



<script>
import db from "@/fb2";

export default {
  data() {
    return {
      student: {}
    };
  },
  created() {
    let dbRef = db.collection("Student").doc(this.$route.params.id);
    dbRef
      .get()
      .then(doc => {
        this.student = doc.data();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("Student")
        .doc(this.$route.params.id)
        .update(this.student)
        .then(() => {
          console.log("User successfully updated!");
          this.$router.push("/Home");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>