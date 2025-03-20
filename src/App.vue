<template>
  <PlayerTable />
</template>

<script setup>
import PlayerTable from './components/PlayerTable.vue'
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
