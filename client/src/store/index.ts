import Vue from "vue";
import Vuex from "vuex";

// Modules
import authModule from "./modules/auth"

const modules = {
  auth: authModule
}

Vue.use(Vuex);

export default new Vuex.Store({
  modules
});
