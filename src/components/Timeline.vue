<script setup lang="ts">
import { usePosts } from "../store/postStore"
import TimelineItem from "./TimelineItem.vue"
import { periods } from "../constants"

const postStore = usePosts()
await postStore.fetchPosts()
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="postStore.setSelectedPeriod(period)"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem
      v-for="post in postStore.filteredPosts"
      :key="post.id"
      class="panel-block"
      :post="post"
    />
  </nav>
</template>
