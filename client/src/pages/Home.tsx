import { Link, useNavigate } from 'react-router-dom'
import {
  Gauge,
  Wrench,
  PencilRuler,
  ShieldCheck,
  Clock,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import QuoteButton from '../components/QuoteButton'
import CategoriaCard from '../components/CategoriaCard'
import { EMPRESA } from '../lib/contatos'
import { CATEGORIAS } from '../lib/catalog'

const SERVICOS = [
  {
    icon: Gauge,
    titulo: 'Padrão de Entrada',
    descricao:
      'Caixas de padrão de entrada para residências e prédios, instaladas conforme as normas da concessionária.',
  },
  {
    icon: Wrench,
    titulo: 'Manutenção Elétrica',
    descricao:
      'Manutenção preventiva e corretiva para manter sua instalação segura e funcionando sem imprevistos.',
  },
  {
    icon: PencilRuler,
    titulo: 'Projetos Elétricos',
    descricao:
      'Projetos completos para construções residenciais e comerciais, do dimensionamento à execução.',
  },
]

const DIFERENCIAIS = [
  { icon: ShieldCheck, titulo: 'Dentro das normas', texto: 'Todo serviço segue as normas técnicas e exigências da concessionária.' },
  { icon: Clock, titulo: 'Execução rápida', texto: 'Agilidade no atendimento e no prazo, sem abrir mão da qualidade.' },
  { icon: Users, titulo: 'Equipe qualificada', texto: 'Profissionais experientes em baixa e média tensão.' },
  { icon: Star, titulo: 'Clientes satisfeitos', texto: 'Atendimento próximo e resultado que gera confiança e indicação.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-28">
          <div className="max-w-3xl animate-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-soft/20 bg-sky-soft/5 px-3 py-1 text-xs font-medium text-sky-soft">
              Baixa e média tensão • Residencial, comercial e industrial
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-frost sm:text-6xl">
              Soluções elétricas <span className="text-gradient">completas</span> e dentro das normas
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
              {EMPRESA.tagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteButton>Solicitar orçamento</QuoteButton>
              <Link
                to="/produtos"
                className="card-glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-frost transition-all hover:-translate-y-0.5 hover:border-sky-soft/40"
              >
                Ver produtos <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="mx-auto max-w-6xl px-4 pt-4 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-frost">Nossos Produtos</h2>
          <p className="mt-3 text-mist">
            Materiais elétricos e padrões de entrada. Escolha uma categoria e monte sua lista.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIAS.map((c) => (
            <CategoriaCard key={c.id} c={c} onClick={() => navigate(`/produtos?cat=${c.id}`)} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/produtos"
            className="card-glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-frost transition-all hover:-translate-y-0.5 hover:border-sky-soft/40"
          >
            Ver todos os produtos <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-frost">O que fazemos</h2>
          <p className="mt-3 text-mist">Serviços elétricos para todas as etapas da sua obra.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICOS.map((s) => (
            <ServiceCard key={s.titulo} {...s} />
          ))}
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-frost">Por que escolher a {EMPRESA.nome}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIAIS.map((d) => (
            <div key={d.titulo} className="card-glass rounded-2xl p-6">
              <d.icon size={28} className="text-amber-soft" />
              <h3 className="mt-4 font-bold text-frost">{d.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="card-glass relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-mid/10 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-frost">Pronto para começar seu projeto?</h2>
            <p className="mx-auto mt-3 max-w-xl text-mist">
              Fale com a gente e receba um orçamento sem compromisso.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <QuoteButton>Solicitar orçamento</QuoteButton>
              <Link
                to="/contato"
                className="card-glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-frost transition-all hover:-translate-y-0.5 hover:border-sky-soft/40"
              >
                Ver canais de contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
