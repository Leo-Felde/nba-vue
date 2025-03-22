<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-opacity-50 flex items-center justify-center confirm-dialog"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 w-96"
      v-click-outside="onClickOutside"
    >
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button
          v-for="(action, index) in actions"
          :key="index"
          @click="handleAction(action)"
          class="px-4 py-2 rounded"
          :class="action.classes"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    actions: {
      type: Array as () => Array<{
        label: string
        value: boolean
        classes?: string
      }>,
      required: true,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const isVisible = ref(true)

    const handleAction = (action: { value: boolean }) => {
      emit('action', action.value)
      isVisible.value = false
    }

    const onClickOutside = () => {
      if (!props.persistent) {
        emit('action', false)
        isVisible.value = false
      }
    }

    return {
      isVisible,
      handleAction,
      onClickOutside,
    }
  },
})
</script>

<style scoped>
.confirm-dialog {
  background: #00000071;
}
</style>
