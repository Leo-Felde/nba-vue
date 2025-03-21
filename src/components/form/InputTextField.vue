<template>
  <div>
    <label
      :for="forId"
      class="block text-sm font-medium text-gray-700 text-left"
    >
      {{ label }}
    </label>
    <input
      :id="forId"
      :type="type"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      "
      class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500': errors.length }"
      :placeholder="placeholder"
    />

    <p v-if="errors.length" class="mt-1 text-sm text-red-500 text-left">
      {{ errorMessages[errors[0]] }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { errorMessages } from '../../utils/validation'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  errors: {
    type: Array as () => string[],
    default: () => [],
  },
})

defineEmits(['update:modelValue'])

// talvez remover letra com acento?
const forId = computed(() => {
  return props.label
    .replace(' ', '-')
    .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '')
})
</script>
