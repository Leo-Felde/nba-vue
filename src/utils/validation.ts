import { ErrorMessages } from '../types/error'

export const errorMessages: ErrorMessages = {
  obrigatorio: 'Campo obrigatório',
  naoZero: 'Deve ser maior que 0',
  invalido: 'Valor inválido',
}

// Seria interessante usar uma lib tipo vee-validate ou sei lá,
// usando um dicionário dessa forma pra auto-validar direto no input

// export const validationRules = {
//   obrigatorio: (value: any) =>
//     (value !== '' && value !== undefined && value !== null) ||
//     'Campo obrigatório.',
//   notZero: (value: any) => value > 0 || 'Não deve ser menor que 1.',
//   counter: (value: any) => value.length <= 20 || 'Max 20 characters.',
// }
