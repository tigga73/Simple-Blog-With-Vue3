<script setup lang="ts">
import { ref } from "vue"
import { TimelinePost } from "../post"

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>
</template>
