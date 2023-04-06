import { createApp } from "vue"
import { createPinia } from "pinia"
import { router } from "./router"
import App from "./App.vue"
import { useUsers } from "./store/userStore"
import { usePosts } from "./store/postStore"

const app = createApp(App)
app.use(createPinia())

const userStore = useUsers()
const postStore = usePosts()

Promise.all([userStore.authenticate(), postStore.fetchPosts()]).then(() => {
  app.use(router)
  app.mount("#app")
})
