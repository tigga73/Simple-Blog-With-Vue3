import { ref, shallowRef } from "vue"
import SignUpForm from "../components/SignUpForm.vue"
import SignInForm from "../components/SignInForm.vue"

const show = ref(false)
const component = shallowRef()
export function useModal() {
  return {
    show,
    component,
    showModal: (type: "signUP" | "signIn") => {
      show.value = true
      switch (type) {
        case "signUP":
          return (component.value = SignUpForm)
        case "signIn":
          return (component.value = SignInForm)
      }
    },
    hideModal: () => (show.value = false),
  }
}
