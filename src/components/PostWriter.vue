<script setup lang="ts">
import { DateTime } from "luxon"
import { ref, onMounted, watch } from "vue"
import { usePosts } from "../store/postStore"
import { useRouter } from "vue-router"
import { marked } from "marked"
import { Post, TimelinePost } from "../post"
import highlight from "highlight.js"
import { debounce } from "lodash"
import { useUsers } from "../store/userStore"

const props = defineProps<{
  post: TimelinePost | Post
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref("")
const contentEditable = ref<HTMLDivElement>()

const postStore = usePosts()
const userStore = useUsers()
const router = useRouter()

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent)
  }, 250),
  {
    immediate: true,
  },
)

onMounted(() => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found")
  }
  contentEditable.value.innerText = content.value
})

function handleInput() {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found")
  }
  content.value = contentEditable.value?.innerText
}

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlight.highlightAuto(code).value
      },
    },
    (err, parseResult) => {
      html.value = parseResult
    },
  )
}

async function handleClick() {
  if (!userStore.currentUserId) {
    throw Error("User was not found")
  }

  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created == "string"
        ? props.post.created
        : props.post.created.toISO(),
    authorId: userStore.currentUserId,
    title: title.value,
    markdown: content.value,
    html: html.value,
  }
  await postStore.createPost(newPost)
  router.push("/")
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>
