<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <textField
      id="first_name"
      label="Nome *"
      type="text"
      v-model:modelValue="form.first_name"
      placeholder="Digite o nome"
      :errors="errors.first_name"
    />

    <textField
      id="last_name"
      label="Sobrenome *"
      type="text"
      v-model:modelValue="form.last_name"
      placeholder="Digite o sobrenome"
      :errors="errors.last_name"
    />

    <textField
      id="position"
      label="Posição *"
      type="text"
      v-model:modelValue="form.position"
      placeholder="Digite a posição"
      :errors="errors.position"
    />

    <textField
      id="jersey_number"
      label="Número da Camisa *"
      type="number"
      v-model:modelValue="form.jersey_number"
      placeholder="Digite o número da camisa"
      :errors="errors.jersey_number"
    />

    <Autocomplete
      v-model="form.team"
      id="team"
      label="Time"
      placeholder="Digite para buscar o time..."
      item-key="full_name"
      :items="teams"
      :errors="errors.team"
      @update:modelValue="onTeamSelect"
    >
      <template #item="{ item }">
        <div class="px-4 py-2 hover:bg-gray-100 flex items-center">
          <TeamIcon :icon="item.value.abbreviation" />
          <span class="font-bold">{{ item.value.full_name }}</span>
          <span class="ml-2 text-sm text-gray-500">{{
            item.value.abbreviation
          }}</span>
        </div>
      </template>
    </Autocomplete>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'

import { fetchTeams } from '../../api/teams'

import { Team } from '@/types/team'

import textField from './InputTextField.vue'
import Autocomplete from './Autocomplete.vue'
import TeamIcon from '../TeamIcon.vue'

export default defineComponent({
  name: 'FormPlayer',

  components: {
    Autocomplete,
    textField,
    TeamIcon,
  },

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },

  emits: ['submit', 'update:modelValue'],
  setup(props, { emit }) {
    const form = ref({ ...props.modelValue })

    const errors = ref({
      first_name: [] as string[],
      last_name: [] as string[],
      position: [] as string[],
      jersey_number: [] as string[],
      team: [] as string[],
    })

    const teams = ref<Array<{ label: string; value: Team }>>([])

    const loadTeams = async () => {
      try {
        const response = await fetchTeams()
        teams.value = response.data.map((team: any) => ({
          label: team.full_name,
          value: { ...team },
        }))
      } catch (error) {
        console.error('Erro ao carregar times:', error)
      }
    }

    const onTeamSelect = (team: any) => {
      form.value.team = team
      errors.value.team = []
      emit('update:modelValue', form.value)
    }

    const validateForm = () => {
      let isValid = true

      errors.value = {
        first_name: [],
        last_name: [],
        position: [],
        jersey_number: [],
        team: [],
      }

      if (!form.value.first_name) {
        errors.value.first_name.push('obrigatorio')
        isValid = false
      }
      if (!form.value.last_name) {
        errors.value.last_name.push('obrigatorio')
        isValid = false
      }
      if (!form.value.position) {
        errors.value.position.push('obrigatorio')
        isValid = false
      }
      if (!form.value.jersey_number) {
        errors.value.jersey_number.push('obrigatorio')
        isValid = false
      } else if (form.value.jersey_number < 1) {
        errors.value.jersey_number.push('naoZero')
        isValid = false
      }
      if (!form.value.team) {
        errors.value.team.push('obrigatorio')
        isValid = false
      }

      return isValid
    }

    const onSubmit = () => {
      if (validateForm()) {
        emit('submit', form.value)
      }
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        form.value = { ...newValue }
      }
    )

    watch(
      form,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )

    onMounted(() => {
      loadTeams()
    })

    return {
      form,
      errors,
      teams,
      onTeamSelect,
      onSubmit,
    }
  },
})
</script>
