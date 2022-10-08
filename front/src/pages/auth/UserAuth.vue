<template>
  <div>
    <b-card class="mt-3" header="Login Form">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <b-row>
          <b-col>
            <b-button type="submit" variant="primary">
              {{submitButtonCaption}}
            </b-button>
          </b-col>
          <b-col>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-col>
          <b-col>
            <b-button @click="switchAuthMode">
              {{switchModeButtonCaption}}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserAuth",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace("/");
    }
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async onSubmit(event: any) {
      event.preventDefault();
      try {
        this.isLoading = true;
        const actionPayload = {
          email: this.form.email,
          password: this.form.password,
        };
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const user = this.$store.getters.user;
        this.isLoading = false;
        this.$router.replace("/");
      } catch (e) {
        this.isLoading = false;
        alert(e);
      }
    },
    onReset(event: any) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    switchAuthMode() {
      // if (this.mode === 'login') {
      //   this.mode = 'signup'
      // } else {
      //   this.mode = 'login'
      // }
      this.mode === "login" ? (this.mode = "signup") : (this.mode = "login");
    },
  },
};
</script>
