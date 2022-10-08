<template>
  <div>
    <the-header />

    <main>
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import TheHeader from "./TheHeader.vue";
export default {
  name: "TheContainer",
  components: {
    TheHeader,
  },
};
</script>
