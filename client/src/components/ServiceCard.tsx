import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  titulo: string
  descricao: string
}

export default function ServiceCard({ icon: Icon, titulo, descricao }: Props) {
  return (
    <div className="card-glass group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sky-soft/40">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-sky-soft/10 ring-1 ring-sky-soft/20 transition-colors group-hover:bg-sky-soft/20">
        <Icon size={24} className="text-sky-soft" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-frost">{titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist">{descricao}</p>
    </div>
  )
}
