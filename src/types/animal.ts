export type StatusSaude =
  | 'saudavel'
  | 'em_tratamento'
  | 'observacao'
  | 'critico'
  | 'adotado'
  | 'obito'

export type FaseHistorico =
  | 'recolhimento'
  | 'internacao'
  | 'tratamento'
  | 'pos_recolhimento'
  | 'adocao'
  | 'obito'

export interface HistoricoEvento {
  id: string
  data: string // ISO date
  fase: FaseHistorico
  titulo: string
  descricao: string
  responsavel?: string
  anexoFoto?: string
}

export interface Animal {
  id: string
  nome?: string
  especie: 'cao' | 'gato' | 'outro'
  sexo: 'macho' | 'femea' | 'indefinido'
  porte: 'pequeno' | 'medio' | 'grande'
  corPelagem: string
  idadeEstimada?: string
  pesoKg?: number
  local: string
  bairro: string
  dataRecolhimento: string // ISO date
  prazoPosseDias: number
  decretoReferencia: string
  statusSaude: StatusSaude
  microchip?: string
  castrado: boolean
  vacinado: boolean
  observacoesClinicas?: string
  foto: string
  historico: HistoricoEvento[]
}
