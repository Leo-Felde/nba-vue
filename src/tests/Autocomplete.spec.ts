import { mount } from '@vue/test-utils'
import Autocomplete from '@/components/form/Autocomplete.vue'
import InputField from '@/components/form/InputTextField.vue'

describe('Autocomplete.vue', () => {
  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  it('renders the component correctly', () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: '',
        items,
      },
    })

    expect(wrapper.findComponent(InputField).exists()).toBe(true)
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('Filtra os dados com base na pesquisa', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: '',
        items,
      },
    })

    await wrapper.find('input').setValue('ap')
    expect(wrapper.vm.filteredItems).toEqual([
      { label: 'Apple', value: 'apple' },
    ])
  })

  it('Abre o dropdown quando clicar no input', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: '',
        items,
      },
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.find('ul').exists()).toBe(true)
  })

  it('Seleciona um item e emite o modelValue correto', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: '',
        items,
      },
    })

    await wrapper.find('input').setValue('ban')
    await wrapper.find('li').trigger('mousedown')

    expect(wrapper.vm.inputValue).toBe('Banana')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted && emitted[0]).toEqual(['banana'])
  })

  it('closes the dropdown on blur', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: '',
        items,
      },
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.vm.isOpen).toBe(true)

    await wrapper.find('input').trigger('blur')
    setTimeout(() => {
      expect(wrapper.vm.isOpen).toBe(false)
    }, 200)
  })

  it('Se não encontrar nenhum item, exibe mensagem correta', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: '',
        items,
      },
    })

    await wrapper.find('input').setValue('xyz')
    expect(wrapper.find('li').text()).toBe('Nenhum dado encontrado...')
  })
})
