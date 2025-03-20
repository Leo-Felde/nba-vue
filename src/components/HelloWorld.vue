<template>
  <div>
    <!-- <PlayerTable /> -->

    <DataTable :headers="headers" :items="items">
      <template #header-status="{ header }">
        <span class="flex items-center">
          {{ header.label }}
          <span class="ml-2 text-xs text-gray-400">(Custom)</span>
        </span>
      </template>

      <template #status="{ item }">
        <span
          :class="`px-2 py-1 text-sm font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`"
        >
          {{ item.status }}
        </span>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchTeams } from '../api/teams.ts'
import { fetchPlayers, getPlayer } from '../api/players.ts'

import TeamIcon from './TeamIcon.vue'
import DataTable from './DataTable.vue'
import { Player } from '../types/player'
import { Team } from '../types/team'
import PlayerTable from './PlayerTable.vue'

components: {
  TeamIcon, DataTable, PlayerTable
}

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'status', label: 'Status' },
]

const items = [
  { name: 'John Doe', age: 28, status: 'Active' },
  { name: 'Jane Smith', age: 34, status: 'Inactive' },
  { name: 'Sam Green', age: 45, status: 'Active' },
]

const teams = ref<Team[]>([])
const players = ref<Player[]>([])
const player = ref<Player | null>(null)

onMounted(async () => {
  // teams.value = await fetchTeams()
  // players.value = await fetchPlayers({
  //   per_page: 25,
  //   cursor: 1,
  //   search: 'james',
  // })
  // player.value = await getPlayer(237)
})
</script>
