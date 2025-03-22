import { defineComponent, reactive, h, createVNode, render } from 'vue'
import { Plugin, inject } from 'vue'
import '../assets/css/snackbar.css'

interface SnackbarOptions {
  message: string
  type: 'success' | 'alert' | 'error'
  duration?: number
}

const SnackbarComponent = defineComponent({
  props: {
    message: String,
    type: String,
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          class: `snackbar p-4 rounded-lg shadow-lg text-white transition-transform transform ${
            props.type === 'success'
              ? 'bg-green-500'
              : props.type === 'alert'
                ? 'bg-yellow-500'
                : 'bg-red-500'
          }`,
        },
        props.message
      )
  },
})

const Snackbar = {
  install: (app) => {
    const snackbarQueue = reactive<SnackbarOptions[]>([])
    const showSnackbar = (options: SnackbarOptions) => {
      snackbarQueue.push(options)

      setTimeout(() => {
        snackbarQueue.shift()
      }, options.duration || 3000)
    }

    app.config.globalProperties.$snackbar = showSnackbar
    app.provide('snackbar', showSnackbar)

    const container = document.createElement('div')
    container.className = 'snackbar-container fixed top-5 right-5 space-y-2'
    document.body.appendChild(container)

    const SnackbarContainer = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            {},
            snackbarQueue.map((snackbar, index) =>
              createVNode(SnackbarComponent, {
                key: index,
                message: snackbar.message,
                type: snackbar.type,
              })
            )
          )
      },
    })

    render(createVNode(SnackbarContainer), container)
  },
} as Plugin

export const useSnackbar = () => {
  const snackbar = inject('snackbar') as (options: SnackbarOptions) => void
  if (!snackbar) {
    throw new Error('Snackbar plugin not installed')
  }
  return snackbar
}

export default Snackbar
