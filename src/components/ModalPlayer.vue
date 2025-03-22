<template>
  <Modal v-model:isOpen="isModalOpen" persistent>
    <template #title>
      <h3 class="text-lg font-semibold">
        {{ playerCopy.id ? 'Editar' : 'Cadastrar' }} jogador
      </h3>
    </template>

    <FormPlayer ref="formulario" @submit="salvar" v-model="playerCopy" />

    <template #actions>
      <button
        v-if="!!player.id"
        @click="excluir"
        :disabled="loadingSave || loadingDelete"
        class="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mr-auto flex items-center justify-center"
        style="width: 80px"
      >
        <span v-if="loadingDelete" class="loader"></span>
        <span v-else>Excluir</span>
      </button>

      <button
        @click="onCancel"
        :disabled="loadingSave || loadingDelete"
        class="hover:text-gray-700 mr-2 px-4 py-2"
      >
        Cancelar
      </button>

      <button
        @click="onSave"
        :disabled="loadingSave || loadingDelete"
        style="width: 90px"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
      >
        <span v-if="loadingSave" class="loader"></span>
        <span v-else>{{ playerCopy.id ? 'Editar' : 'Cadastrar' }}</span>
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { useSnackbar } from '@/plugins/SnackbarPlugin'
import { useConfirm } from '@/plugins/ConfirmationDialogPlugin'

import { createPlayer, deletePlayer, updatePlayer } from '@/api/players'

import { Player } from '@/types/player'

import Modal from './Modal.vue'
import FormPlayer from './form/FormPlayer.vue'

export default defineComponent({
  name: 'ModalFormPlayer',

  components: {
    Modal,
    FormPlayer,
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    player: {
      type: Object as PropType<Player>,
      default: () => ({
        id: null,
        first_name: null,
        last_name: null,
        position: null,
        height: null,
        weight: null,
        jersey_number: null,
        college: null,
        country: null,
        draft_year: null,
        draft_round: null,
        draft_number: null,
        team: null,
      }),
    },
  },

  emits: ['update:isOpen', 'save', 'delete'],
  setup(props, { emit }) {
    const snackbar = useSnackbar()
    const confirm = useConfirm()

    const isModalOpen = ref(props.isOpen)
    const formulario = ref<InstanceType<typeof FormPlayer> | null>(null)

    const loadingSave = ref(false)
    const loadingDelete = ref(false)

    const playerCopy = ref({ ...props.player })

    watch(isModalOpen, (newValue) => {
      emit('update:isOpen', newValue)
    })

    const onSave = async () => {
      if (formulario.value) {
        formulario.value.onSubmit()
      }
    }

    const onCancel = () => {
      isModalOpen.value = false
    }

    const excluir = async () => {
      if (!props.player.id) return

      const confirmDelete = await confirm({
        title: 'Excluir jogador',
        message:
          'Tem certeza que deseja excluir o jogador? Essa ação não poderá ser desfeita',
        actions: [
          {
            label: 'Excluir',
            value: true,
            classes: 'bg-red-500 hover:bg-red-600 text-white',
          },
          {
            label: 'Cancelar',
            value: false,
            classes: 'bg-green-500 hover:bg-green-600 text-white',
          },
        ],
      })
      if (!confirmDelete) return

      loadingDelete.value = true

      try {
        await deletePlayer(props.player.id)

        snackbar({
          message: 'Jogador excluído com sucesso',
          type: 'success',
        })
        isModalOpen.value = false
      } catch (err) {
        let errMesage = 'Não foi possível excluir o jogador.'

        if (err.data.status === 404) {
          errMesage = 'O jogador não foi encontrado ou já foi excluído.'
        }

        snackbar({
          message: errMesage,
          type: 'error',
        })
      } finally {
        loadingDelete.value = false
      }
    }

    const salvar = async () => {
      loadingSave.value = true

      try {
        if (props.player.id) {
          await updatePlayer(playerCopy.value)

          snackbar({
            message: 'Jogador editado com sucesso',
            type: 'success',
          })

          isModalOpen.value = false
        } else {
          const resp = await createPlayer(playerCopy.value)

          if (resp.data.id) {
            snackbar({
              message: 'Jogador criado com sucesso',
              type: 'success',
            })

            playerCopy.value = resp.data
          } else {
            snackbar({
              message: 'Não foi possível criar o jogador.',
              type: 'error',
            })
          }
        }
      } catch (err) {
        snackbar({
          message: 'Não foi possível salvar o jogador.',
          type: 'error',
        })
      } finally {
        loadingSave.value = false
      }
    }

    watch(
      () => props.isOpen,
      (newValue) => {
        isModalOpen.value = newValue
      }
    )

    watch(
      () => props.player,
      (newValue) => {
        playerCopy.value = { ...newValue }
      },
      { deep: true }
    )

    return {
      isModalOpen,
      formulario,
      loadingSave,
      loadingDelete,
      onSave,
      onCancel,
      excluir,
      salvar,
      playerCopy,
    }
  },
})
</script>

<style>
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
