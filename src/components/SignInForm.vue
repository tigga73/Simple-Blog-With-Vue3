<script setup lang="ts">
import { ref } from "vue"
import { useModal } from "../composables/modal"
import { useUsers } from "../store/userStore"
import { NewUser } from "../users"
import UserForm from "./UserForm.vue"

const userStore = useUsers()
const modal = useModal()

const error = ref("")

async function handleSignIn(newUser: NewUser) {
  const body = JSON.stringify(newUser)
  const res = await window.fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  if ([401, 404].includes(res.status)) {
    error.value = "Username or password was incorrect."
  } else {
    userStore.authenticate()
    modal.hideModal()
  }
}
</script>

<template>
  <UserForm @submit="handleSignIn" :error="error" :isLogin="true" />
</template>
