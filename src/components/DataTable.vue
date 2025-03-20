<template>
  <div>
    <div
      v-if="hasTopSlot"
      class="border-b border-gray-200"
      :class="loading ? 'pb-2' : 'pb-4'"
    >
      <slot name="top"></slot>
    </div>

    <div class="overflow-x-auto">
      <div v-if="loading" class="bg-white">
        <div class="px-1 py-1 whitespace-nowrap text-sm text-gray-900">
          <div class="w-full h-1 bg-gray-200 rounded">
            <div class="h-full bg-sky-400 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <slot :name="`header-${header.key}`" :header="header">
                {{ header.label }}
              </slot>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in items" :key="index">
            <td
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <slot :name="header.key" :item="item">
                {{ item[header.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!hidePagination" class="flex justify-between items-center mt-4">
      <button
        :disabled="!hasPrev || disablePagination || loading"
        @click="handlePrev"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <button
        :disabled="!hasNext || disablePagination || loading"
        @click="handleNext"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, useSlots } from 'vue'

interface Header {
  key: string
  label: string
}

export default defineComponent({
  name: 'DataTable',
  props: {
    headers: {
      type: Array as PropType<Header[]>,
      required: true,
    },
    items: {
      type: Array as PropType<Record<string, any>[]>,
      required: true,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    disablePagination: {
      type: Boolean,
      default: false,
    },
    hasNext: {
      type: Boolean,
      default: false,
    },
    hasPrev: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['next', 'prev'],
  setup(props, { emit }) {
    const slots = useSlots()

    const hasTopSlot = computed(() => !!slots.top)

    const handleNext = () => {
      emit('next')
    }

    const handlePrev = () => {
      emit('prev')
    }

    return {
      hasTopSlot,
      handleNext,
      handlePrev,
    }
  },
})
</script>
