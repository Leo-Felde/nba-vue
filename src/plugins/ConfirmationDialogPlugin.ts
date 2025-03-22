import {
  defineComponent,
  reactive,
  h,
  createVNode,
  render,
  inject,
  Plugin,
} from 'vue'

import ConfirmDialog from '../components/ConfirmDialog.vue'

interface ConfirmOptions {
  title: string
  message: string
  actions?: Array<{ label: string; value: boolean; classes?: string }>
  persistent?: boolean
  type?: 'confirm' | 'acknowledge'
}

const defaultActions = {
  confirm: [
    { label: 'Confirmar', value: true, classes: 'bg-blue-500 text-white' },
    { label: 'Cancelar', value: false, classes: 'bg-gray-300' },
  ],
  acknowledge: [
    { label: 'OK', value: true, classes: 'bg-green-500 text-white' },
  ],
}

const ConfirmPlugin = {
  install(app) {
    const confirmQueue = reactive<ConfirmOptions[]>([])

    const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        confirmQueue.push(options)

        const container = document.createElement('div')
        container.className = 'confirmDialog-container'

        document.body.appendChild(container)

        const removeDialog = () => {
          confirmQueue.shift()
          document.body.removeChild(container)
        }

        const ConfirmContainer = defineComponent({
          setup() {
            const handleAction = (value: boolean) => {
              resolve(value)
              removeDialog()
            }

            return () =>
              h(ConfirmDialog, {
                title: options.title,
                message: options.message,
                actions:
                  options.actions ?? defaultActions[options.type || 'confirm'],
                persistent: options.persistent ?? true,
                onAction: handleAction,
              })
          },
        })

        render(createVNode(ConfirmContainer), container)
      })
    }

    app.provide('confirm', showConfirm)
  },
} as Plugin

export const useConfirm = () => {
  const confirm =
    inject<(options: ConfirmOptions) => Promise<boolean>>('confirm')
  if (!confirm) {
    throw new Error('Confirm plugin not installed')
  }
  return confirm
}

export default ConfirmPlugin
