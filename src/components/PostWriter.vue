<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { marked } from "marked"
import { TimelinePost } from "../post"
import highlight from "highlight.js"

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref("")
const contentEditable = ref<HTMLDivElement>()

watch(
  content,
  (newContent) => {
    marked.parse(
      newContent,
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
  },
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
</template>
