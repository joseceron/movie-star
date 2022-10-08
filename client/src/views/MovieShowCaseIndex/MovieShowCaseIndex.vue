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
          v-for="movie in catalogItem.items"
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
      <b-modal
        :title="movieSelected.title"
        v-model="showModalDetail"
        no-close-on-backdrop
        hide-header-close
        size="md"
      >
        <div v-if="movieSelected.castKeys.length > 0">
          <b-row v-for="(item, i) in movieSelected.castKeys" v-bind:key="i">
            <b-col style="text-align: left">
              <strong>{{ item }}:</strong>
              <!-- {{ movieSelected.castAndCrew }} -->
            </b-col>
          </b-row>
        </div>
        <template #modal-footer>
          <div class="w-100">
            <b-row>
              <b-col lg="6">
                <b-button size="md" variant="warning" @click="closeModal()">
                  Aceptar
                </b-button>
              </b-col>
            </b-row>
          </div>
        </template>
      </b-modal>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { movieApi } from "@/api/movie-api";
import type { Movie } from "@/models/movie";
import type { MovieSelected } from "@/models/movieSelected";

const initialMovieSelected: MovieSelected = {
  title: "",
  castAndCrew: {},
  castKeys: [],
  castValues: [],
};

interface CatalogItem {
  id: string,
  name: string,
  items: Movie[],
  lasEvaluatedKey: object
}

const catalog: CatalogItem[] = []


export default Vue.extend({
  name: "MovieShowCaseIndex",
  props: {},
  data() {
    return {
      isFetching: false,
      catalog: [],
      error: null,
      movieSelected: initialMovieSelected,
      showModalDetail: false,
    };
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace("/pages/login");
    } else {
      this.fetchMovies();
    }
  },
  methods: {
    fetchMovies() {
      this.isFetching = true;
      const token = this.$store.getters.user.token;
      movieApi
        .fetchPaginated(token)
        .then((movies) => {
          // this.catalog = movies;

          this.catalog = movies

          this.isFetching = false;
        })
        .catch((e) => {
          console.error;
          this.isFetching = false;
        });
    },
    imgUrl() {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      return `https://source.unsplash.com/random?sig=${randomNumber}`;
    },
    showModal(movie: Movie) {
      this.movieSelected["title"] = movie.title;
      this.movieSelected.castAndCrew = movie.castAndCrew;

      this.movieSelected.castKeys = Object.keys(movie.castAndCrew);

      this.showModalDetail = true;
    },
    closeModal() {
      this.showModalDetail = false;
    },
  },
});
</script>
