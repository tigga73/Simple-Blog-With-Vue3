<script setup lang="ts">
import { RouterView } from "vue-router"
import NavBar from "./components/Navbar.vue"
</script>

<template>
  <div class="section">
    <div class="container">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";

ul {
  list-style: rever !important;
  list-style-position: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h5 {
  font-size: revert !important;
}

h1,
h2,
h3,
h4,
h5,
h5,
p,
pre {
  margin: 10px 0 !important;
}
</style>
