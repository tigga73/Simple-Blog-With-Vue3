<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue"
import { useRoute, useRouter } from "vue-router"
import { usePosts } from "../store/postStore"
import { Post } from "../post"

const route = useRoute()
const router = useRouter()
const postStore = usePosts()

const id = route.params.id as string
const post = postStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

async function handleSubmit(post: Post) {
  await postStore.updatePost(post)
  router.push("/")
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
