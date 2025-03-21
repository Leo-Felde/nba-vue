<template>
  <div>
    <FormModalPlayer v-model:isOpen="isModalOpen" :player="formPlayer" />

    <PlayerTable @editar="openEditDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Player } from '../../types/player'

import PlayerTable from '../../components/PlayerTable.vue'
import FormModalPlayer from '../../components/form/ModalPlayer.vue'

const isModalOpen = ref(false)
const formPlayer = ref<Player | null>(null)

const openEditDialog = (player: Player) => {
  formPlayer.value = player
  isModalOpen.value = true
}
</script>

<style scoped>
.player-table {
  height: 70dvh;
  overflow: hidden;
}

@media (min-width: 1080px) {
  .player-table {
    width: 60dvw;
  }
}

@media (max-width: 1079px) {
  .player-table {
    width: 80dvw;
  }
}

@media (max-width: 759px) {
  .player-table {
    width: 90dvw;
  }
}

:deep(.data-table-footer) {
  bottom: -22px;
}

:deep(.data-table-content) {
  height: calc(70dvh - 145px);
}
</style>
