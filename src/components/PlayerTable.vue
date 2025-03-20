<template>
  <div
    class="player-table block bg-white border border-gray-200 rounded-lg shadow-sm p-5"
  >
    <DataTable
      :headers="headers"
      :items="players"
      :hide-pagination="false"
      :disable-pagination="!!searchQuery"
      :has-next="!!nextCursor"
      :has-prev="!!prevCursor"
      :loading="loading"
      @next="fetchNext"
      @prev="fetchPrev"
    >
      <template #top>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Jogadores da NBA</h2>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Digite para pesquisar..."
            class="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 w-sm"
            @input="debouncedHandleSearch"
          />
        </div>
      </template>

      <template #team="{ item }">
        {{ item.team.full_name }}
      </template>

      <template #action="{ item }">
        <button class="bg-blue-500">editar</button>
      </template>
      <template #tbody-before v-if="searchQuery && !players.length">
        <tr class="font-semibold text-gray-500">
          <td :colspan="headers.length">
            Nenhum jogador encontrado com base na pesquisa
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Player } from '../types/player'
import { useSnackbar } from '../plugins/SnackbarPlugin.ts'

import { fetchPlayers } from '../api/players.ts'

import DataTable from './DataTable.vue'

function debounce(fn: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export default defineComponent({
  name: 'PlayerTable',

  components: {
    DataTable,
  },

  setup() {
    const snackbar = useSnackbar()

    const players = ref<Player[]>([])
    const itemsPerPage = ref<number>(25)
    const nextCursor = ref<number | null>(null)
    const prevCursor = ref<number | null>(null)
    const loading = ref<boolean>(false)
    const searchQuery = ref('')

    const headers = [
      { key: 'first_name', label: 'Nome' },
      { key: 'last_name', label: 'Sobrenome' },
      { key: 'position', label: 'Posição' },
      { key: 'team', label: 'Time' },
      { key: 'action', label: 'Ações' },
    ]

    const fetchData = async (cursor: number | null = null) => {
      try {
        loading.value = true
        const response = await fetchPlayers({
          per_page: itemsPerPage.value,
          cursor: cursor,
          search: searchQuery.value,
        })
        players.value = response.data
        nextCursor.value = response.meta.next_cursor
        prevCursor.value = response.meta.prev_cursor || null
      } catch (error) {
        snackbar({
          message: 'Ocorreu um erro ao listar os jogadores.',
          type: 'error',
        })
      } finally {
        loading.value = false
      }
    }

    const fetchNext = () => {
      if (nextCursor.value) {
        fetchData(nextCursor.value)
      }
    }

    const fetchPrev = () => {
      if (prevCursor.value) {
        fetchData(prevCursor.value - itemsPerPage.value)
      }
    }

    const handleSearch = () => {
      if (searchQuery.value.length < 3 && searchQuery.value.length !== 0) return

      nextCursor.value = null
      prevCursor.value = null
      fetchData()
    }

    const debouncedHandleSearch = debounce(handleSearch, 300)

    fetchData()

    return {
      players,
      headers,
      nextCursor,
      prevCursor,
      loading,
      searchQuery,
      fetchNext,
      fetchPrev,
      debouncedHandleSearch,
    }
  },
})
</script>
