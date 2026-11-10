/**
 * Endereço do backend.
 *
 * O site é uma exportação estática (GitHub Pages): não há servidor Next por
 * trás, então o navegador conversa direto com o backend. Por isso o padrão
 * é HTTPS — a página é HTTPS, e o navegador bloqueia chamada a HTTP puro
 * (mixed content). O mesmo endereço que o site do COPOL usa.
 *
 * Em desenvolvimento local, `NEXT_PUBLIC_API_URL=http://localhost:3000`
 * funciona porque `next dev` também roda em HTTP.
 */
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://painel.lspk.com.br"
).replace(/\/+$/, "");
