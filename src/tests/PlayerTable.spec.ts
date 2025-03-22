import { mount } from '@vue/test-utils'
import PlayerTable from '@/components/PlayerTable.vue'
import DataTable from '@/components/DataTable.vue'
import { fetchPlayers } from '@/api/players'
import { useSnackbar } from '@/plugins/SnackbarPlugin'

// Mock do Snackbar Plugin
jest.mock('@/plugins/SnackbarPlugin', () => ({
  useSnackbar: jest.fn(),
}))

jest.mock('@/api/players', () => ({
  fetchPlayers: jest.fn(),
}))

describe('PlayerTable.vue', () => {
  let mockSnackbar: jest.Mock
  let mockFetchPlayers: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()

    mockSnackbar = jest.fn()
    ;(useSnackbar as jest.Mock).mockReturnValue(mockSnackbar)

    mockFetchPlayers = fetchPlayers as jest.Mock
    mockFetchPlayers.mockResolvedValue({
      data: [
        {
          first_name: 'LeBron',
          last_name: 'James',
          position: 'SF',
          team: { full_name: 'Lakers' },
        },
        {
          first_name: 'Stephen',
          last_name: 'Curry',
          position: 'PG',
          team: { full_name: 'Warriors' },
        },
      ],
      meta: { next_cursor: 2, prev_cursor: null },
    })
  })

  it('deve renderizar o componente corretamente', async () => {
    const wrapper = mount(PlayerTable)

    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.findComponent(DataTable).exists()).toBeTruthy()
    expect(wrapper.find('h2').text()).toBe('Jogadores da NBA')
  })

  it('deve chamar fetchPlayers ao montar o componente', async () => {
    mount(PlayerTable)
    expect(mockFetchPlayers).toHaveBeenCalledTimes(1)
  })

  it('deve passar os headers corretamente para o DataTable', async () => {
    const wrapper = mount(PlayerTable)
    const headers = ['Nome', 'Sobrenome', 'Posição', 'Time', 'Ações']
    await wrapper.vm.$nextTick()

    const dataTable = wrapper.findComponent(DataTable)
    expect(dataTable.exists()).toBeTruthy()

    const tableHeaders = wrapper.findAll('th')
    expect(tableHeaders.length).toBe(headers.length)
    for (let i = 0; i < headers.length; i++) {
      expect(tableHeaders[i].text()).toBe(headers[i])
    }
  })

  it('deve exibir os jogadores retornados pela API', async () => {
    const wrapper = mount(PlayerTable)
    await wrapper.vm.$nextTick()

    const rows = wrapper.findAll('tbody tr:not(.loading-row)')
    expect(rows).toHaveLength(2)
    expect(rows[0].text()).toContain('LeBron')
    expect(rows[1].text()).toContain('Curry')
  })

  it('deve exibir mensagem de erro caso a API falhe', async () => {
    mockFetchPlayers.mockRejectedValue(new Error('Erro na API'))

    mount(PlayerTable)
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(mockSnackbar).toHaveBeenCalledWith({
      message: 'Ocorreu um erro ao listar os jogadores.',
      type: 'error',
    })
  })

  it('deve chamar fetchNext ao clicar no botão de próxima página', async () => {
    const wrapper = mount(PlayerTable)
    await wrapper.vm.$nextTick()

    await wrapper.findComponent(DataTable).vm.$emit('next')

    expect(mockFetchPlayers).toHaveBeenCalledWith(
      expect.objectContaining({ cursor: 2 })
    )
  })

  it('deve chamar fetchPrev ao clicar no botão de página anterior', async () => {
    mockFetchPlayers.mockResolvedValue({
      data: [],
      meta: { next_cursor: 75, prev_cursor: 50 },
    })

    const wrapper = mount(PlayerTable)
    await wrapper.vm.$nextTick()

    await wrapper.findComponent(DataTable).vm.$emit('prev')

    expect(mockFetchPlayers).toHaveBeenCalledWith(
      expect.objectContaining({ cursor: 25 })
    )
  })

  it('deve chamar handleSearch ao digitar na pesquisa', async () => {
    const wrapper = mount(PlayerTable)
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input')
    await input.setValue('LeBron')

    await new Promise((resolve) => setTimeout(resolve, 350)) // Espera o debounce de digitar

    expect(mockFetchPlayers).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'LeBron' })
    )
  })
})
