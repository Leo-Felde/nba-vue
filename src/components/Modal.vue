<template>
  <transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 modal"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 px-6 pb-5 pt-3"
        v-click-outside="onClickOutside"
      >
        <div class="flex justify-between items-center mb-4">
          <slot name="header">
            <slot name="title">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
            </slot>
            <button
              @click="close"
              class="text-gray-500 hover:text-gray-700 rounded-full text-xl px-4 py-2"
            >
              &times;
            </button>
          </slot>
        </div>
        <div class="mb-4">
          <slot></slot>
        </div>
        <div class="flex">
          <slot name="actions">
            <button
              @click="close"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Fechar
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    persistent: Boolean,
    title: {
      type: String,
      default: '',
    },
  },

  emits: ['update:isOpen'],
  setup(props, { emit }) {
    const close = () => {
      emit('update:isOpen', false)
    }

    const onClickOutside = () => {
      if (!props.persistent && props.isOpen) close()
    }

    return {
      close,
      onClickOutside,
    }
  },
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal {
  background: #00000071;
}
</style>
