import { mount } from '@vue/test-utils'
import DataTable from '../components/DataTable.vue'

describe('DataTable.vue', () => {
  const headers = [
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'age', label: 'Idade', sortable: true },
  ]

  const items = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 25 },
    { name: 'Alice', age: 28 },
  ]

  it('renderiza os headers corretamente', () => {
    const wrapper = mount(DataTable, {
      props: { headers, items, loading: false },
    })

    const ths = wrapper.findAll('thead th')
    expect(ths.length).toBe(headers.length)
    headers.forEach((header, index) => {
      expect(ths[index].text()).toBe(header.label)
    })
  })

  it('Renderiza os items corretamente', () => {
    const wrapper = mount(DataTable, {
      props: { headers, items, loading: false },
    })

    const rows = wrapper.findAll('tbody tr:not(.loading-row)')
    expect(rows.length).toBe(items.length)
    items.forEach((item, rowIndex) => {
      const cells = rows[rowIndex].findAll('td')
      headers.forEach((header, colIndex) => {
        expect(cells[colIndex].text()).toBe(String(item[header.key]))
      })
    })
  })

  it('Exibe barra de loading', () => {
    const wrapper = mount(DataTable, {
      props: { headers, items, loading: true },
    })

    const loadingBar = wrapper.find('.animate-pulse')
    expect(loadingBar.exists()).toBeTruthy()
  })

  it('Exibe mensagem se não tiver nenhum item', () => {
    const wrapper = mount(DataTable, {
      props: { headers, items: [], loading: false },
    })

    const noDataMessage = wrapper.find('tbody tr td')
    expect(noDataMessage.text()).toBe('Nenhum dado encontrado.')
  })

  it('Emite os eventos "next" e "prev" ao clicar na paginação', async () => {
    const wrapper = mount(DataTable, {
      props: { headers, items, hasNext: true, hasPrev: true, loading: false },
    })

    const nextButton = wrapper.find('.data-table-next-btn')
    const prevButton = wrapper.find('.data-table-prev-btn')

    await nextButton.trigger('click')
    await prevButton.trigger('click')

    expect(wrapper.emitted().next).toBeTruthy()
    expect(wrapper.emitted().prev).toBeTruthy()
  })

  it('Ordena os itens em ordem crescente ao clicar no cabeçalho', async () => {
    const wrapper = mount(DataTable, {
      props: { headers, items, loading: false },
    })

    const nameHeader = wrapper.findAll('thead th')[0]
    await nameHeader.trigger('click')

    const rows = wrapper.findAll('tbody tr:not(.loading-row)')
    expect(rows[0].findAll('td')[0].text()).toBe('Alice')
    expect(rows[1].findAll('td')[0].text()).toBe('Jane Doe')
    expect(rows[2].findAll('td')[0].text()).toBe('John Doe')
  })

  it('Ordena os itens em ordem decrescente ao clicar novamente no cabeçalho', async () => {
    const wrapper = mount(DataTable, {
      props: { headers, items, loading: false },
    })

    const nameHeader = wrapper.findAll('thead th')[0]
    await nameHeader.trigger('click')
    await nameHeader.trigger('click')

    const rows = wrapper.findAll('tbody tr:not(.loading-row)')
    expect(rows[0].findAll('td')[0].text()).toBe('John Doe')
    expect(rows[1].findAll('td')[0].text()).toBe('Jane Doe')
    expect(rows[2].findAll('td')[0].text()).toBe('Alice')
  })

  it('Ordena os itens usando uma função de ordenação personalizada', async () => {
    const customHeaders = [
      { key: 'name', label: 'Nome', sortable: true },
      {
        key: 'age',
        label: 'Idade',
        sortable: true,
        sortFn: (item) => item.age,
      },
    ]

    const wrapper = mount(DataTable, {
      props: { headers: customHeaders, items, loading: false },
    })

    const ageHeader = wrapper.findAll('thead th')[1]
    await ageHeader.trigger('click')

    const rows = wrapper.findAll('tbody tr:not(.loading-row)')
    expect(rows[0].findAll('td')[1].text()).toBe('25')
    expect(rows[1].findAll('td')[1].text()).toBe('28')
    expect(rows[2].findAll('td')[1].text()).toBe('30')
  })
})
