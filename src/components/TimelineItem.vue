<script setup lang="ts">
import { TimelinePost } from "../post"

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <a>{{ post.title }}</a>
  <div>{{ post.created.toFormat("d MMMM") }}</div>
</template>
