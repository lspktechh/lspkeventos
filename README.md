# LSPK Eventos

Site público do participante: acessar o QR Code, o comprovante de presença e o
certificado, fazer a inscrição e ver os eventos realizados.

Next.js 15 (App Router) + React 19 + Tailwind 4. Publicado na Vercel
(`vercel.json`, região `gru1`).

## Desenvolvimento

```bash
npm install
cp .env.local.example .env.local   # ajuste NEXT_PUBLIC_API_URL
npm run dev                        # http://localhost:3001
```

`NEXT_PUBLIC_API_URL` aponta para o backend do sistema de gestão. As rotas
`/api/*` deste site são só um proxy para ele (nada de dados próprios).

## Telas

| Rota | O que é |
| --- | --- |
| `/` | **Acessar** — e-mail da inscrição → QR Code |
| `/inscricao` | **Inscrição** — vai direto ao evento aberto (ou lista, se houver vários) |
| `/inscricao/[slug]` | Formulário de inscrição do evento |
| `/realizados` | **Realizados** — eventos Encerrados e marcados para o site no painel |
| `/checkin` | QR Code do participante (depois do login) |

## Produção

```bash
npm run build && npm start
```

Há também um `Dockerfile` (build standalone do Next).

Este repositório foi extraído de `apps/attendee` do monorepo `event-checkin`,
com o histórico dessa pasta.
