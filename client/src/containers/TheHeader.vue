<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="primary">
      <b-navbar-brand href="#">MovieLand</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Crear</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button v-if="isAuthenticated" size="sm" class="my-2 my-sm-0" @click.prevent="logout"
              >Logout</b-button
            >
          </b-nav-form>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "TheHeader",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout")
        this.$router.replace({name: "Login"})  
      } catch (e) {
        alert(e)
      }
      
    }
  }
});
</script>
