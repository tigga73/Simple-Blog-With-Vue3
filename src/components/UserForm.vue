<script setup lang="ts">
import { computed, ref } from "vue"
import FormInput from "./FormInput.vue"
import { validate, length, required } from "../validation"
import { NewUser } from "../users"
import { useUsers } from "../store/userStore"
import { useModal } from "../composables/modal"

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void
}>()

const username = ref("")
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })])
})

const password = ref("")
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })])
})

const isValid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

const userStore = useUsers()
const modal = useModal()

function handleSubmit() {
  if (!isValid) {
    return
  }

  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }

  try {
    emit("submit", newUser)
  } catch (e) {}
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput
      name="Username"
      v-model="username"
      :status="usernameStatus"
      type="text"
    />
    <FormInput
      name="Password"
      v-model="password"
      :status="passwordStatus"
      type="password"
    />
    <div class="is-danger help">
      <p>{{ error }}</p>
    </div>
    <button class="button" :disabled="isValid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background-color: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
