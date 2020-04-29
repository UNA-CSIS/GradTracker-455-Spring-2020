import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import AddStudent from "@/views/AddStudent.vue";
import edit from "@/views/edit.vue";
//import Submit from "@/views/Submit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",

    component: Home,
  },
  {
    path: "/AddStudent",
    name: "AddStudent",

    component: AddStudent,
  },
  {
    path: "/edit",
    name: "edit",

    component: edit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
