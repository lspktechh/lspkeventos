import type { NextConfig } from "next";

// Exportação estática, hospedada no GitHub Pages (domínio próprio), sem
// servidor Node por trás. O navegador conversa direto com o backend (ver
// src/lib/backend.ts). Rotas que dependem de um evento que ainda nem existe
// no momento do build usam query string (?e=<slug>), e o 404.html traduz os
// endereços antigos (ver src/app/not-found.tsx).
// Prefixo do endereço (ver src/lib/caminho.ts). Vazio com domínio próprio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: {
    // Sem servidor de otimização de imagens no GitHub Pages.
    unoptimized: true,
  },
};

export default nextConfig;
