import { mount } from '@vue/test-utils'
import InputTextField from '@/components/form/InputTextField.vue'
import { errorMessages } from '@/utils/validation'

describe('InputTextField.vue', () => {
  it('Renderiza o campo e label corretamente', () => {
    const label = 'Eu sou uma label'
    const wrapper = mount(InputTextField, {
      props: {
        label: label,
        modelValue: '',
      },
    })

    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.find('label').text()).toBe(label)
  })

  it('Ao digitar, emite modelValue com o valor correto', async () => {
    const wrapper = mount(InputTextField, {
      props: {
        label: 'Nome',
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('Testailson Oliveira')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
      'Testailson Oliveira',
    ])
  })

  it('Exibe mensagem de erro corretamente', () => {
    const wrapper = mount(InputTextField, {
      props: {
        label: 'Nome',
        modelValue: '',
        errors: ['obrigatorio'],
      },
    })
    expect(wrapper.find('p').text()).toBe(errorMessages['obrigatorio'])
  })
})
