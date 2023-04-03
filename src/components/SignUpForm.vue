<script setup lang="ts">
import { useModal } from "../composables/modal"
import { useUsers } from "../store/userStore"
import { NewUser } from "../users"
import UserForm from "./UserForm.vue"

const userStore = useUsers()
const modal = useModal()

async function handleSubmit(newUser: NewUser) {
  userStore.createUser(newUser)
  modal.hideModal()
}
</script>

<template>
  <UserForm @submit="handleSubmit" />
</template>
