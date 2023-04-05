<script setup lang="ts">
import { RouterLink } from "vue-router"
import { TimelinePost } from "../post"

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="is-flex-direction-column is-align-items-start"
  >
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMMM") }}</div>
  </RouterLink>
</template>
