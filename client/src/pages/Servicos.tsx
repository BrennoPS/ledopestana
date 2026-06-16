import { PlugZap, Wrench, Factory } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import WhatsAppButton from '../components/WhatsAppButton'
import { EMPRESA } from '../lib/contatos'

const SERVICOS = [
  {
    icon: PlugZap,
    titulo: 'Instalação de Padrão de Entrada',
    descricao:
      'Instalação completa de caixa de padrão de entrada residencial e predial, seguindo todas as normas da concessionária local.',
  },
  {
    icon: Wrench,
    titulo: 'Manutenção em Baixa Tensão',
    descricao:
      'Manutenção preventiva e corretiva de instalações em baixa tensão para residências e comércios.',
  },
  {
    icon: Factory,
    titulo: 'Manutenção em Média Tensão',
    descricao:
      'Manutenção especializada em sistemas de média tensão para indústrias e grandes estabelecimentos.',
  },
]

export default function Servicos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center animate-in">
        <h1 className="text-4xl font-extrabold tracking-tight text-frost">Nossos Serviços</h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">
          Soluções elétricas completas em baixa e média tensão para residências, comércios
          e indústrias.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {SERVICOS.map((s) => (
          <ServiceCard key={s.titulo} {...s} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <WhatsAppButton
          mensagem={`Olá! Gostaria de falar com um especialista da ${EMPRESA.nome}.`}
        >
          Falar com um especialista
        </WhatsAppButton>
      </div>
    </section>
  )
}
