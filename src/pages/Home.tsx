import { useMemo, useState } from 'react'
import { animais } from '../data/animais'
import SearchBar, { Filtros } from '../components/SearchBar'
import AnimalCard from '../components/AnimalCard'

export default function Home() {
  const bairros = useMemo(() => Array.from(new Set(animais.map((a) => a.bairro))), [])
  const [filtros, setFiltros] = useState<Filtros>({
    termo: '', especie: '', statusSaude: '', bairro: '', ordenarPor: 'recentes',
  })

  const resultados = useMemo(() => {
    let lista = animais.filter((a) => {
      const termo = filtros.termo.toLowerCase()
      const combina = !termo ||
        a.id.toLowerCase().includes(termo) ||
        a.local.toLowerCase().includes(termo) ||
        a.bairro.toLowerCase().includes(termo) ||
        a.corPelagem.toLowerCase().includes(termo)
      const combinaEspecie = !filtros.especie || a.especie === filtros.especie
      const combinaStatus = !filtros.statusSaude || a.statusSaude === filtros.statusSaude
      const combinaBairro = !filtros.bairro || a.bairro === filtros.bairro
      return combina && combinaEspecie && combinaStatus && combinaBairro
    })
    lista = lista.sort((a, b) => {
      const da = new Date(a.dataRecolhimento).getTime()
      const db = new Date(b.dataRecolhimento).getTime()
      return filtros.ordenarPor === 'recentes' ? db - da : da - db
    })
    return lista
  }, [filtros])

  return (
    <div className="page">
      <header className="hero">
        <h1>Portal de Transparência — Canil Municipal</h1>
        <p>Busque, filtre e acompanhe o histórico completo de cada animal recolhido.</p>
      </header>

      <SearchBar bairros={bairros} onChange={setFiltros} />

      <p className="resultado-contador">{resultados.length} animal(is) encontrado(s)</p>

      <div className="grid-animais">
        {resultados.map((a) => (
          <AnimalCard key={a.id} animal={a} />
        ))}
        {resultados.length === 0 && <p>Nenhum animal encontrado com os filtros selecionados.</p>}
      </div>
    </div>
  )
}
