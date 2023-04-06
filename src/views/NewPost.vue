<script setup lang="ts">
import { DateTime } from "luxon"
import PostWriter from "../components/PostWriter.vue"
import { Post, TimelinePost } from "../post"
import { useRouter } from "vue-router"
import { usePosts } from "../store/postStore"
import { useUsers } from "../store/userStore"

const userStore = useUsers()
const router = useRouter()
const postStore = usePosts()

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  authorId: userStore.currentUserId,
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
}

async function handleSubmit(post: Post) {
  await postStore.createPost(post)
  router.push("/")
}
</script>

<template>
  New Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
