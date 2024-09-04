import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/mtg",
      name: "mtg",
      component: () => import("./components/CardsList")
    },
    {
      path: "/mtg/:id",
      name: "tutorial-details",
      component: () => import("./components/CurrentCard")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCard")
    }
  ]
});
