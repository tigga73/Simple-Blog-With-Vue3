<script setup lang="ts">
import { TimelinePost } from "../post"

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <a class="is-flex-direction-column is-align-items-start">
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMMM") }}</div>
  </a>
</template>
