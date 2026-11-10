import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * As fontes da marca LSPK: Space Grotesk e a fonte de dados.
 *
 * Hospedadas no próprio repositório (src/app/fonts), e não baixadas do Google
 * durante o build. O download em tempo de build falhava de forma intermitente
 * ("An error occurred in `next/font`") e derrubava o deploy inteiro; com os
 * arquivos aqui o build não depende de nenhuma rede, e a página também não
 * faz chamada externa ao carregar. Só o subconjunto latino (cobre o português).
 * Licenças em src/app/fonts/LICENSES.md.
 *
 * O portal (Acessar / Inscrição / Realizados) usa JetBrains Mono nos rótulos e
 * datas; as telas mais antigas seguem com IBM Plex Mono.
 */
const grotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--fonte-titulo",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/ibm-plex-mono-500-latin.woff2",
  weight: "500",
  style: "normal",
  variable: "--fonte-mono",
  display: "swap",
});

const monoPortal = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--fonte-mono-portal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LSPK Eventos",
  description: "Acesse seu QR Code, comprovante de presença e certificado, ou faça sua inscrição.",
  other: {
    google: "notranslate",
  },
};

// Quase todo acesso é pelo celular, na fila da entrada. A barra do
// navegador na mesma cor do fundo evita a faixa branca em cima do site.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1115",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      translate="no"
      className={`notranslate ${grotesk.variable} ${mono.variable} ${monoPortal.variable}`}
    >
      <head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
        <meta name="robots" content="notranslate" />
      </head>
      <body className="notranslate" translate="no">
        {children}
      </body>
    </html>
  );
}
