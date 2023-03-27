<script setup lang="ts">
import { DateTime } from "luxon"
import PostWriter from "../components/PostWriter.vue"
import { TimelinePost } from "../post"

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title",
}
</script>

<template>
  <PostWriter :post="post" />
</template>
