import { defineStore } from "pinia"
import { DateTime } from "luxon"
import { Post, today, thisWeek, thisMonth, TimelinePost } from "../post"
import { Period } from "../constants"

interface PostState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

function delay() {
  return new Promise((res) => setTimeout(res, 1500))
}

export const usePosts = defineStore("posts", {
  state: (): PostState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },

    async fetchPosts() {
      const res = await window.fetch("/api/posts")
      const data = (await res.json()) as Post[]
      await delay()

      let id: string[] = []
      let all: Map<string, Post> = new Map<string, Post>()
      for (const post of data) {
        id.push(post.id)
        all.set(post.id, post)
      }

      this.ids = id
      this.all = all
    },

    createPost(post: TimelinePost) {
      const body = JSON.stringify({ ...post, created: post.created.toISO() })
      return window.fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
    },
  },

  getters: {
    filteredPosts(state): TimelinePost[] {
      return state.ids
        .map((id) => {
          const post = state.all.get(id)

          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found.`)
          }

          return {
            ...post,
            created: DateTime.fromISO(post.created),
          }
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 })
          }
          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 })
          }
          return post
        })
    },
  },
})
