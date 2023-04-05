<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue"
import { useRoute } from "vue-router"
import { usePosts } from "../store/postStore"

const route = useRoute()
const postStore = usePosts()

const id = route.params.id as string
const post = postStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" />
</template>
