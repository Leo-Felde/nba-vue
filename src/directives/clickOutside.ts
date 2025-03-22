import { DirectiveBinding } from 'vue'

const eventMap = new WeakMap<HTMLElement, (event: MouseEvent) => void>()

export const clickOutside = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (
        el.offsetParent !== null &&
        !(el === event.target || el.contains(event.target as Node))
      ) {
        binding.value(event)
      }
    }

    setTimeout(() => {
      eventMap.set(el, clickOutsideHandler)
      document.addEventListener('click', clickOutsideHandler)
    }, 0)
  },
  unmounted(el: HTMLElement) {
    const clickOutsideHandler = eventMap.get(el)
    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler)
      eventMap.delete(el)
    }
  },
}
