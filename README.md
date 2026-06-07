# Vilsan — Next.js 15

Site institucional da Vilsan Water Angola, migrado de PHP/MySQL para a stack moderna.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS 4 |
| Formulários | React Hook Form + Zod |
| Base de Dados | Supabase (PostgreSQL) |
| Email | Resend |
| Deploy | Vercel (recomendado) |

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/contact/        → POST /api/contact (lead capture)
│   ├── dashboard/          → Painel admin
│   │   └── orcamentos/
│   │       └── [id]/       → Detalhe + gestão de lead
│   ├── sitemap.ts          → /sitemap.xml
│   └── robots.ts           → /robots.txt
├── components/
│   ├── forms/              → ContactForm (RHF + Zod)
│   ├── layout/             → Navbar, Footer
│   ├── sections/           → Hero, Serviços, Catálogo, etc.
│   └── ui/                 → WhatsAppFloat, etc.
├── lib/
│   ├── supabase.ts         → Cliente Supabase
│   └── rateLimit.ts        → Rate limiter em memória
├── schemas/
│   └── contact.ts          → Schema Zod do formulário
└── types/
    └── index.ts            → Tipos TypeScript
```

## Setup

### 1. Supabase

1. Criar projecto em [supabase.com](https://supabase.com)
2. Correr o SQL em `supabase-schema.sql` no SQL Editor
3. Copiar URL e chaves do projecto

### 2. Resend

1. Criar conta em [resend.com](https://resend.com)
2. Verificar domínio ou usar domínio de teste
3. Copiar API key

### 3. Variáveis de Ambiente

Editar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RESEND_API_KEY=re_...
ADMIN_EMAIL=clesiopacavira91@gmail.com
WHATSAPP_NUM=244926891271

DASHBOARD_SECRET=vilsan-admin-2025
```

### 4. Instalar e Correr

```bash
npm install
npm run dev        # http://localhost:3000
```

### 5. Deploy (Vercel)

```bash
npx vercel          # seguir as instruções
```

Adicionar as variáveis de ambiente no dashboard da Vercel.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Site principal |
| `/api/contact` | POST — receber leads (rate limited) |
| `/dashboard` | Painel admin — estatísticas |
| `/dashboard/orcamentos` | Lista de leads com filtros |
| `/dashboard/orcamentos/[id]` | Detalhe + actualizar estado |
| `/sitemap.xml` | Sitemap para SEO |
| `/robots.txt` | Robots para SEO |

## Segurança Implementada

- **Rate Limiting**: 5 pedidos/minuto por IP
- **Honeypot**: Campo oculto para bloquear bots
- **Zod Validation**: Validação server-side em todos os campos
- **Service Role**: Operações admin usam chave de serviço do Supabase
- **RLS**: Row Level Security activo na tabela contacts

## Próximos Passos (Roadmap)

- [ ] Autenticação no dashboard (Supabase Auth)
- [ ] Cloudflare Turnstile CAPTCHA
- [ ] Framer Motion para animações premium
- [ ] Gestão de Produtos, Serviços e Testemunhos via admin
- [ ] Google Analytics
- [ ] Upload de imagens via Supabase Storage
