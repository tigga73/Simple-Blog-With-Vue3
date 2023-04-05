<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"
import { usePosts } from "../store/postStore"
import { useUsers } from "../store/userStore"
import { computed } from "vue"

const route = useRoute()
const postStore = usePosts()
const userStore = useUsers()

const id = route.params.id as string
const post = postStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

const canEdit = computed(() => {
  if (!userStore.currentUserId) {
    return false
  }

  if (userStore.currentUserId !== post.authorId) {
    return false
  }

  return true
})
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
        v-if="canEdit"
        :to="`/posts/${post.id}/edit`"
        class="is-rounded is-link button"
      >
        Edit Post
      </RouterLink>
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column"></div>
  </div>
</template>
