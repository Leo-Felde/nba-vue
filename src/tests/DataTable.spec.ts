import { mount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue' // Ajuste o caminho conforme necessário

describe('DataTable.vue', () => {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ]

  const items = [
    { name: 'John Doe', age: 28 },
    { name: 'Jane Smith', age: 34 },
  ]

  // Teste 1: Renderização básica do componente
  it('renders the component with headers and items', () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
      },
    })

    // Verifica se os headers são renderizados
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Age')

    // Verifica se os itens são renderizados
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('28')
    expect(wrapper.text()).toContain('Jane Smith')
    expect(wrapper.text()).toContain('34')
  })

  // Teste 2: Renderização do slot "top"
  it('renders the top slot', () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
      },
      slots: {
        top: '<div class="top-slot">Top Content</div>',
      },
    })

    // Verifica se o slot "top" é renderizado
    expect(wrapper.find('.top-slot').exists()).toBe(true)
    expect(wrapper.text()).toContain('Top Content')
  })

  // Teste 3: Renderização dos slots de cabeçalho
  it('renders header slots', () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
      },
      slots: {
        'header-name':
          '<template #header-name="{ header }">{{ header.label }} (Custom)</template>',
      },
    })

    // Verifica se o slot de cabeçalho personalizado é renderizado
    expect(wrapper.text()).toContain('Name (Custom)')
  })

  // Teste 4: Renderização dos slots de itens
  it('renders item slots', () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
      },
      slots: {
        name: '<template #name="{ item }">{{ item.name }} (Custom)</template>',
      },
    })

    // Verifica se o slot de item personalizado é renderizado
    expect(wrapper.text()).toContain('John Doe (Custom)')
    expect(wrapper.text()).toContain('Jane Smith (Custom)')
  })

  // Teste 5: Paginação - Botões "Anterior" e "Próximo"
  it('emits "next" and "prev" events when pagination buttons are clicked', async () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
        hasNext: true,
        hasPrev: true,
      },
    })

    // Clica no botão "Próximo" e verifica se o evento é emitido
    await wrapper.find('button:contains("Próximo")').trigger('click')
    expect(wrapper.emitted('next')).toBeTruthy()

    // Clica no botão "Anterior" e verifica se o evento é emitido
    await wrapper.find('button:contains("Anterior")').trigger('click')
    expect(wrapper.emitted('prev')).toBeTruthy()
  })

  // Teste 6: Paginação - Botões desabilitados
  it('disables pagination buttons when disablePagination or loading is true', async () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
        hasNext: true,
        hasPrev: true,
        disablePagination: true,
        loading: true,
      },
    })

    // Verifica se os botões estão desabilitados
    expect(
      wrapper.find('button:contains("Próximo")').attributes('disabled')
    ).toBe('')
    expect(
      wrapper.find('button:contains("Anterior")').attributes('disabled')
    ).toBe('')
  })

  // Teste 7: Estado de carregamento
  it('shows loading state when loading is true', () => {
    const wrapper = mount(DataTable, {
      props: {
        headers,
        items,
        loading: true,
      },
    })

    // Verifica se o indicador de carregamento é exibido
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })
})
