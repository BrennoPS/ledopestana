// Dados de contato centralizados — edite só aqui para atualizar o site inteiro.

export const EMPRESA = {
  nome: 'Ledo & Pestana',
  nomeCompleto: 'Ledo & Pestana Soluções Elétricas',
  tagline:
    'Especialistas em instalação de padrão de entrada, manutenção elétrica e projetos em baixa e média tensão.',
  email: 'ledoepestanasolucoeseletricas@gmail.com',
  instagramHandle: '@ledoepestanasolucoeseletricas',
  instagramUrl: 'https://www.instagram.com/ledoepestanasolucoeseletricas/',
  telefoneLoja: '+55 13 3223-6533',
}

export type Contato = {
  nome: string
  telefone: string // formato exibido
  whatsapp: string // só dígitos, com DDI, para link wa.me
}

export const CONTATOS: Contato[] = [
  { nome: 'Rodrigo Pestana', telefone: '+55 13 99746-2683', whatsapp: '5513997462683' },
]

// Contato principal usado em TODOS os CTAs (orçamento, lista de produtos, especialista).
export const WHATSAPP_PRINCIPAL = CONTATOS[0].whatsapp

/** Monta um link wa.me com mensagem pré-preenchida. */
export function linkWhatsApp(numero: string, mensagem: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
