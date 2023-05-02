import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import FormInput from "../../components/FormInput.vue"

describe("FormInputComponent", () => {
  it("render error", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "bar",
        status: {
          valid: false,
          message: "error",
        },
        type: "input",
      },
    })

    expect(wrapper.find(".is-danger").exists()).toBe(true)
  })

  it("render no errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "bar",
        status: {
          valid: true,
          message: "error",
        },
        type: "input",
      },
    })

    expect(wrapper.find(".is-danger").exists()).toBe(false)
  })
})
