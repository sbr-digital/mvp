import { useState } from 'react'

export interface Filtros {
  termo: string
  especie: string
  statusSaude: string
  bairro: string
  ordenarPor: 'recentes' | 'antigos'
}

interface Props {
  bairros: string[]
  onChange: (f: Filtros) => void
}

export default function SearchBar({ bairros, onChange }: Props) {
  const [filtros, setFiltros] = useState<Filtros>({
    termo: '',
    especie: '',
    statusSaude: '',
    bairro: '',
    ordenarPor: 'recentes',
  })

  function atualizar(parcial: Partial<Filtros>) {
    const novo = { ...filtros, ...parcial }
    setFiltros(novo)
    onChange(novo)
  }

  return (
    <div className="search-bar" role="search">
      <input
        type="text"
        placeholder="Buscar por ID, local, bairro ou cor..."
        value={filtros.termo}
        onChange={(e) => atualizar({ termo: e.target.value })}
        aria-label="Buscar animal"
      />

      <select value={filtros.especie} onChange={(e) => atualizar({ especie: e.target.value })}>
        <option value="">Espécie (todas)</option>
        <option value="cao">Cão</option>
        <option value="gato">Gato</option>
        <option value="outro">Outro</option>
      </select>

      <select value={filtros.statusSaude} onChange={(e) => atualizar({ statusSaude: e.target.value })}>
        <option value="">Status de saúde (todos)</option>
        <option value="saudavel">Saudável</option>
        <option value="em_tratamento">Em tratamento</option>
        <option value="observacao">Em observação</option>
        <option value="critico">Crítico</option>
        <option value="adotado">Adotado</option>
        <option value="obito">Óbito</option>
      </select>

      <select value={filtros.bairro} onChange={(e) => atualizar({ bairro: e.target.value })}>
        <option value="">Bairro (todos)</option>
        {bairros.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <select value={filtros.ordenarPor} onChange={(e) => atualizar({ ordenarPor: e.target.value as Filtros['ordenarPor'] })}>
        <option value="recentes">Mais recentes</option>
        <option value="antigos">Mais antigos</option>
      </select>
    </div>
  )
}
