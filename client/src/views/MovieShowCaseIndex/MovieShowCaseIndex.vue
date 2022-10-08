<template>
  <div>
    <div v-for="catalogItem in catalog" v-bind:key="catalogItem.name">
      <b-row>
        <b-col>
          <h3>{{ catalogItem.name }} ({{ catalogItem.items.length }})</h3>
        </b-col>
      </b-row>

      <b-row v-if="catalogItem.items.length > 0">
        <b-col
          lg="3"
          md="4"
          sm="6"
          v-for="(movie, index) in catalogItem.items"
          v-bind:key="movie.id"
        >
          <b-card bg-variant="dark" text-variant="white">
            <img
              :src="`${imgUrl()}`"
              class="card-img-top"
              alt="..."
              height="250"
            />
            <strong>{{ movie.title }}</strong> - {{ movie.year }}
            <b-card-text>
              <b-form-rating
                v-model="movie.rating"
                readonly
                variant="warning"
                show-value
              ></b-form-rating>
            </b-card-text>

            <b-button @click="showModal(movie)" variant="primary" pill
              >More...</b-button
            >
          </b-card>
        </b-col>
      </b-row>

      <b-row v-else>
        <b-col> ---There are no movies in this Category--- </b-col>
      </b-row>
    </div>

    <section>
      <b-modal ref="my-modal" hide-footer :title="movieSelected.title">
        <div class="d-block text-center">
          <div v-if="movieSelected.castKeys.length > 0">
            <b-row v-for="(item, i) in movieSelected.castKeys" v-bind:key="i">
              <b-col style="text-align: left">
                <strong>{{ item }}:</strong>
                {{ movieSelected.castAndCrew[`${item}`] }}
              </b-col>
            </b-row>
          </div>
        </div>
        <b-button class="mt-3" variant="info" block @click="hideModal"
          >Close</b-button
        >
      </b-modal>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { movieApi } from "@/api/movie-api";

export default Vue.extend({
  name: "MovieShowCaseIndex",
  props: {},
  data() {
    return {
      isFetching: false,
      catalog: [],
      error: null,
      movieSelected: {
        title: "",
        castAndCrew: null,
        castKeys: [],
      },
    };
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace('/pages/login')
    } else {
      this.fetchMovies();
    }
  },
  methods: {
    fetchMovies() {
      this.isFetching = true;
      const token = this.$store.getters.user.token
      movieApi
        .fetchPaginated(token)
        .then((movies) => (this.catalog = movies))
        .catch((e) => console.error)
        .finally(() => (this.isFetching = false));
    },
    imgUrl() {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      return `https://source.unsplash.com/random?sig=${randomNumber}`;
    },
    showModal(movie) {
      this.movieSelected.title = movie.title;
      this.movieSelected.castAndCrew = movie.castAndCrew;

      this.movieSelected.castKeys = Object.keys(movie.castAndCrew);

      if (this.movieSelected.castKeys.length) {
        this.movieSelected.castKeys.map((item) => {
          this.movieSelected.castAndCrew[`${item}`] =
            this.movieSelected.castAndCrew[`${item}`].join(", ");
        });
      }

      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
});
</script>
