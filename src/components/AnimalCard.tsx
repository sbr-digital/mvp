import { Link } from 'react-router-dom'
import { Animal } from '../types/animal'

const statusLabel: Record<string, string> = {
  saudavel: 'Saudável',
  em_tratamento: 'Em tratamento',
  observacao: 'Em observação',
  critico: 'Crítico',
  adotado: 'Adotado',
  obito: 'Óbito',
}

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (img.dataset.fallback === 'true') return
  img.dataset.fallback = 'true'
  img.onerror = null
  img.src = '/placeholder-animal.svg'
}

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Link to={`/animal/${animal.id}`} className="animal-card">
      <img
        src={animal.foto}
        alt={`Foto do animal ${animal.id}`}
        onError={handleImgError}
      />
      <div className="animal-card-body">
        <span className={`badge status-${animal.statusSaude}`}>{statusLabel[animal.statusSaude]}</span>
        <h3>Animal recolhido {new Date(animal.dataRecolhimento).toLocaleDateString('pt-BR')}</h3>
        <p>{animal.bairro} · {animal.corPelagem} · {animal.porte}</p>
        <p className="muted">ID: {animal.id}</p>
      </div>
    </Link>
  )
}
