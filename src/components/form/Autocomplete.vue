<template>
  <div class="relative">
    <InputField
      :label="label"
      type="text"
      v-model:modelValue="inputValue"
      :placeholder="placeholder"
      :errors="errors"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <ul
      v-if="isOpen"
      class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <template v-if="filteredItems.length > 0">
        <li
          v-for="(item, index) in filteredItems"
          :key="index"
          @mousedown="selectItem(item)"
          class="cursor-pointer"
        >
          <slot name="item" :item="item">
            <div class="px-4 py-2 hover:bg-gray-100">
              {{ item.label }}
            </div>
          </slot>
        </li>
      </template>
      <li v-else class="px-4 py-2 text-gray-500">Nenhum dado encontrado...</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import InputField from './InputTextField.vue'

export default defineComponent({
  name: 'Autocomplete',

  components: {
    InputField,
  },

  props: {
    modelValue: {
      type: [String, Object, null],
      required: true,
    },
    items: {
      type: Array as () => Array<{
        label: string
        value: any
      }>,
      required: true,
    },
    itemKey: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errors: {
      type: Array as () => string[],
      default: () => [],
    },
  },

  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref('')
    const isOpen = ref(false)
    const selectedItem = ref<{
      label: string
      value: string
      [key: string]: any
    } | null>(null)

    const filteredItems = computed(() => {
      return props.items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.value.toLowerCase())
      )
    })

    const onInput = () => {
      isOpen.value = true
    }

    const onFocus = () => {
      isOpen.value = true
    }

    const onBlur = () => {
      setTimeout(() => {
        isOpen.value = false
      }, 200)
    }

    const selectItem = (item: {
      label: string
      value: string
      [key: string]: any
    }) => {
      selectedItem.value = item
      inputValue.value = item.label
      isOpen.value = false
      emit('update:modelValue', props.returnObject ? item : item.value)
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        if (typeof newValue === 'string') {
          const item = props.items.find((item) => item.value === newValue)
          if (item) {
            selectedItem.value = item
            inputValue.value = item.label
          }
        } else if (newValue && typeof newValue === 'object') {
          selectedItem.value = newValue as {
            label: string
            value: string
            [key: string]: any
          }
          inputValue.value = newValue[props.itemKey]
        }
      },
      { immediate: true }
    )

    return {
      inputValue,
      isOpen,
      filteredItems,
      onInput,
      onFocus,
      onBlur,
      selectItem,
    }
  },
})
</script>
