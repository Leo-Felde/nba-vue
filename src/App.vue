<template>
  <PlayerTable />
</template>

<script setup>
import PlayerTable from './components/PlayerTable.vue'
</script>

<style scoped>
.player-table {
  height: 70dvh;
  width: 60dvw;
  overflow: hidden;
}

:deep(.data-table-footer) {
  bottom: -22px;
}

:deep(.data-table-content) {
  height: calc(70dvh - 145px);
}
</style>
