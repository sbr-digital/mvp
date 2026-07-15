import { useParams, Link } from 'react-router-dom'
import { animais } from '../data/animais'

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (img.dataset.fallback === 'true') return
  img.dataset.fallback = 'true'
  img.onerror = null
  img.src = '/placeholder-animal.svg'
}

const statusLabel: Record<string, string> = {
  saudavel: 'Saudável',
  em_tratamento: 'Em tratamento',
  observacao: 'Em observação',
  critico: 'Crítico',
  adotado: 'Adotado',
  obito: 'Óbito',
}

const faseLabel: Record<string, string> = {
  recolhimento: 'Recolhimento',
  internacao: 'Internação',
  tratamento: 'Tratamento',
  pos_recolhimento: 'Pós-recolhimento',
  adocao: 'Adoção',
  obito: 'Óbito',
}

export default function AnimalDetail() {
  const { id } = useParams()
  const animal = animais.find((a) => a.id === id)

  if (!animal) {
    return (
      <div className="page">
        <p>Animal não encontrado.</p>
        <Link to="/">Voltar à lista</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="voltar">← Voltar à lista</Link>

      <div className="detalhe-header">
        <img src={animal.foto} alt={`Foto do animal ${animal.id}`} onError={handleImgError} />
        <div>
          <span className={`badge status-${animal.statusSaude}`}>{statusLabel[animal.statusSaude]}</span>
          <h1>Animal {animal.id}</h1>
          <p>{animal.local}, Bairro {animal.bairro}</p>
        </div>
      </div>

      <section className="dados-basicos">
        <h2>Dados básicos</h2>
        <div className="tabela-dados">
          <div><strong>Espécie:</strong> {animal.especie}</div>
          <div><strong>Sexo:</strong> {animal.sexo}</div>
          <div><strong>Porte:</strong> {animal.porte}</div>
          <div><strong>Cor/Pelagem:</strong> {animal.corPelagem}</div>
          <div><strong>Idade estimada:</strong> {animal.idadeEstimada ?? 'Não informada'}</div>
          <div><strong>Peso:</strong> {animal.pesoKg ? `${animal.pesoKg} kg` : 'Não registrado'}</div>
          <div><strong>Castrado:</strong> {animal.castrado ? 'Sim' : 'Não'}</div>
          <div><strong>Vacinado:</strong> {animal.vacinado ? 'Sim' : 'Não'}</div>
          <div><strong>Data do recolhimento:</strong> {new Date(animal.dataRecolhimento).toLocaleDateString('pt-BR')}</div>
          <div><strong>Prazo legal para posse:</strong> {animal.prazoPosseDias} dias úteis ({animal.decretoReferencia})</div>
        </div>
      </section>

      <section className="saude">
        <h2>Situação de saúde</h2>
        <p>{animal.observacoesClinicas ?? 'Nenhuma observação clínica registrada.'}</p>
      </section>

      <section className="historico">
        <h2>Histórico ao longo do tempo</h2>
        <ol className="timeline">
          {animal.historico
            .slice()
            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            .map((evento) => (
              <li key={evento.id} className={`timeline-item fase-${evento.fase}`}>
                <div className="timeline-data">{new Date(evento.data).toLocaleDateString('pt-BR')}</div>
                <div className="timeline-conteudo">
                  <span className="timeline-fase">{faseLabel[evento.fase]}</span>
                  <h3>{evento.titulo}</h3>
                  <p>{evento.descricao}</p>
                  {evento.responsavel && <p className="muted">Responsável: {evento.responsavel}</p>}
                </div>
              </li>
            ))}
        </ol>
      </section>
    </div>
  )
}
