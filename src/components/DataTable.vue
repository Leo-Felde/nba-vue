<template>
  <div class="flex flex-col max-h-inh">
    <div
      v-if="hasTopSlot"
      class="border-b border-gray-200"
      :class="loading ? 'pb-2' : 'pb-4'"
    >
      <slot name="top"></slot>
    </div>

    <div class="flex-1 overflow-hidden">
      <div v-if="loading" class="bg-white">
        <div class="px-1 py-1 whitespace-nowrap text-sm text-gray-900">
          <div class="w-full h-1 bg-gray-200 rounded">
            <div class="h-full bg-sky-400 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div class="overflow-auto data-table-content">
        <table class="min-w-full divide-y divide-gray-200 hidden sm:table">
          <thead class="data-table-header bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="header.sortable ? sortBy(header.key) : null"
              >
                <div class="flex items-center">
                  <slot :name="`header-${header.key}`" :header="header">
                    {{ header.label }}
                  </slot>
                  <span v-if="header.sortable" class="ml-2">
                    <span v-if="sortedColumn === header.key">
                      {{ sortDirection === 'asc' ? '▲' : '▼' }}
                    </span>
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <slot name="tbody-before">
              <tr class="loading-row">
                <td
                  :colspan="headers.length"
                  v-if="!items.length"
                  class="px-6 py-4 font-semibold text-gray-400 text-center"
                >
                  {{ loading ? 'Carregando...' : 'Nenhum dado encontrado.' }}
                </td>
              </tr>
            </slot>
            <tr
              v-for="(item, index) in sortedItems"
              :key="index"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            >
              <td
                v-for="header in headers"
                :key="header.key"
                class="px-6 py-4 text-sm text-gray-900 text-left"
              >
                <slot :name="header.key" :item="item">
                  {{ item[header.key] }}
                </slot>
              </td>
            </tr>
            <slot name="tbody-after" />
          </tbody>
        </table>

        <!-- Tabela pro mobile -->
        <div class="sm:hidden">
          <div
            v-for="(item, index) in sortedItems"
            :key="index"
            class="p-4 mb-4 rounded-lg shadow"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <div v-for="header in headers" :key="header.key" class="mb-2 flex">
              <div class="text-sm font-bold uppercase">{{ header.label }}:</div>
              <div class="text-sm pl-1.5 text-gray-900">
                <slot :name="header.key" :item="item">
                  {{ item[header.key] }}
                </slot>
              </div>
            </div>
          </div>
          <div
            v-if="!items.length"
            class="font-semibold text-gray-400 text-center py-4"
          >
            {{ loading ? 'Carregando...' : 'Nenhum dado encontrado.' }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="!hidePagination"
      class="data-table-footer sticky bg-white border-t border-gray-200 py-3"
    >
      <div class="flex justify-between items-center px-4">
        <button
          :disabled="!hasPrev || disablePagination || loading"
          @click="handlePrev"
          class="data-table-prev-btn px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          :disabled="!hasNext || disablePagination || loading"
          @click="handleNext"
          class="data-table-next-btn px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, useSlots, ref } from 'vue'

interface Header {
  key: string
  label: string
  sortable?: boolean
  sortFn?: (item: any) => any // Função de ordenação personalizada
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

    const sortedColumn = ref<string | null>(null)
    const sortDirection = ref<'asc' | 'desc'>('asc')

    const sortedItems = computed(() => {
      if (!sortedColumn.value) return props.items

      const header = props.headers.find((h) => h.key === sortedColumn.value)
      if (!header || !header.sortable) return props.items

      return [...props.items].sort((a, b) => {
        const valueA = header.sortFn ? header.sortFn(a) : a[sortedColumn.value!]
        const valueB = header.sortFn ? header.sortFn(b) : b[sortedColumn.value!]

        if (valueA < valueB) {
          return sortDirection.value === 'asc' ? -1 : 1
        }
        if (valueA > valueB) {
          return sortDirection.value === 'asc' ? 1 : -1
        }
        return 0
      })
    })

    const sortBy = (column: string) => {
      if (sortedColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortedColumn.value = column
        sortDirection.value = 'asc'
      }
    }

    const handleNext = () => {
      emit('next')
    }

    const handlePrev = () => {
      emit('prev')
    }

    return {
      hasTopSlot,
      sortedColumn,
      sortDirection,
      sortedItems,
      sortBy,
      handleNext,
      handlePrev,
    }
  },
})
</script>
