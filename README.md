# LSPK Eventos

Site público do participante: acessar o QR Code, o comprovante de presença e o
certificado, fazer a inscrição e ver os eventos realizados.

Next.js 15 + React 19 + Tailwind 4, **exportação estática** publicada no
**GitHub Pages**. Não há servidor: o navegador conversa direto com o backend do
sistema de gestão (`NEXT_PUBLIC_API_URL`, em HTTPS).

## Desenvolvimento

```bash
npm install
cp .env.local.example .env.local   # ajuste NEXT_PUBLIC_API_URL
npm run dev                        # http://localhost:3001
```

## Telas

| Rota | O que é |
| --- | --- |
| `/` | **Acessar** — e-mail da inscrição → QR Code |
| `/inscricao/` | **Inscrição** — vai direto ao evento aberto (ou lista, se houver vários) |
| `/inscricao/?e=<slug>` | Formulário de inscrição do evento |
| `/realizados/` | **Realizados** — eventos Encerrados e marcados para o site no painel |
| `/trabalhos/?e=<slug>` | Consulta e reenvio de trabalhos |
| `/checkin/` | QR Code do participante (depois do login) |

O evento vai em `?e=<slug>` porque a exportação estática não gera uma página por
evento que ainda nem existe no momento do build. Os endereços antigos
(`/inscricao/<slug>`, `/<slug>/trabalhos`…) continuam funcionando: o `404.html`
(`src/app/not-found.tsx`) os reconhece e redireciona.

## Publicação (GitHub Pages)

1. *Settings → Pages → Source*: **GitHub Actions** (uma vez só).
2. *Settings → Pages → Custom domain*: o domínio do site (e o DNS apontando para
   o GitHub). Depois, marque *Enforce HTTPS*.
3. Todo push na `main` roda `.github/workflows/pages.yml` e publica.

Para trocar o backend sem mexer no código: *Settings → Secrets and variables →
Actions → Variables* → `API_URL`.

O backend precisa aceitar a origem do site em CORS (`CORS_ORIGINS`, na VPS).

## Origem

Extraído de `apps/attendee` do monorepo `event-checkin`, com o histórico dessa
pasta, e convertido para exportação estática.
