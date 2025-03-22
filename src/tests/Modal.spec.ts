import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('Modal.vue', () => {
  it('Renderiza o modal quando "isOpen" for true', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        title: 'Titulo',
      },
    })

    expect(wrapper.find('.modal').exists()).toBeTruthy()
    expect(wrapper.find('.modal').isVisible()).toBeTruthy()
  })

  it('Não renderiza quando "isOpen" for false', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: false,
        title: 'Titulo',
      },
    })

    expect(wrapper.find('.modal').exists()).toBeFalsy()
  })

  it('Emite o evento "update:isOpen" com false quando o botão de fechar for clicado', async () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        title: 'Titulo',
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:isOpen')).toBeTruthy()
    expect(wrapper.emitted('update:isOpen')?.[0]).toEqual([false])
  })

  it('Renderiza o slot de título', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        title: 'Titulo',
      },
      slots: {
        title: '<h2>Titulo personalizado</h2>',
      },
    })

    expect(wrapper.find('h2').text()).toBe('Titulo personalizado')
  })

  it('Renderiza o slot de conteúdo', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        title: 'Titulo',
      },
      slots: {
        default: '<p>Conteúdo personalizado</p>',
      },
    })

    expect(wrapper.find('p').text()).toBe('Conteúdo personalizado')
  })

  it('Renderiza o slot de ações', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        title: 'Titulo',
      },
      slots: {
        actions: '<button class="botao-custom">botão personalizado</button>',
      },
    })
    expect(wrapper.find('.botao-custom').text()).toBe('botão personalizado')
  })
})
