<script setup lang="ts">
import { ref, computed } from "vue"
import { DateTime } from "luxon"
import { TimelinePost, today, thisWeek, thisMonth } from "../post"
import { usePosts } from "../store/postStore"
import TimelineItem from "./TimelineItem.vue"

const periods = ["Today", "This Week", "This Month"] as const

type Period = typeof periods[number]

const selectedPeriod = ref<Period>("Today")

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const postStore = usePosts()

const posts = computed<TimelinePost[]>(() => {
  return postStore.ids
    .map((id) => {
      const post = postStore.all.get(id)

      if (!post) {
        throw Error(`Post with id of ${id} was expected but not found.`)
      }

      return {
        ...post,
        created: DateTime.fromISO(post.created),
      }
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 })
      }
      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 })
      }
      return post
    })
})
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="selectPeriod(period)"
        :class="{ 'is-active': period === selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem
      v-for="post in posts"
      :key="post.id"
      class="panel-block"
      :post="post"
    />
  </nav>
</template>
