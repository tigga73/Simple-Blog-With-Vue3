<script setup lang="ts">
import { computed } from "@vue/reactivity"
import { RouterView } from "vue-router"
import { useModal } from "./composables/modal"
import NavBar from "./components/Navbar.vue"
import { useUsers } from "./store/userStore"

const modal = useModal()
const userStore = useUsers()

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  }
})

userStore.authenticate()
</script>

<template>
  <div class="modal" style="color: white" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal"></button>
  </div>

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
