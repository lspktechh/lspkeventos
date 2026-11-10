"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PortalShell } from "@/components/portal/PortalShell";
import estilos from "@/components/portal/portal.module.css";

/**
 * Endereços que já foram divulgados e deixaram de existir como arquivo.
 *
 * O GitHub Pages responde com este 404.html para qualquer caminho que não
 * seja uma página gerada. Os links antigos (/inscricao/<evento>,
 * /<evento>/trabalhos…) são reconhecidos aqui e levados ao endereço novo,
 * onde o evento vai em `?e=`.
 */
function destinoAntigo(pathname: string): string | null {
  const caminho = pathname.replace(/\/+$/, "");

  let m = caminho.match(/^\/inscricao\/([^/]+)$/);
  if (m) return `/inscricao/?e=${m[1]}`;

  m = caminho.match(/^\/([^/]+)\/(?:inscricao|incricao)$/);
  if (m) return `/inscricao/?e=${m[1]}`;

  m = caminho.match(/^\/([^/]+)\/trabalhos$/);
  if (m) return `/trabalhos/?e=${m[1]}`;

  return null;
}

export default function PaginaNaoEncontrada() {
  const [redirecionando, setRedirecionando] = useState(false);

  useEffect(() => {
    const destino = destinoAntigo(window.location.pathname);
    if (destino) {
      setRedirecionando(true);
      window.location.replace(destino + window.location.hash);
    }
  }, []);

  return (
    <PortalShell aba="acessar">
      {redirecionando ? (
        <p className={estilos.estado}>Redirecionando…</p>
      ) : (
        <section className={estilos.secao}>
          <h1 className={estilos.titulo}>Página não encontrada</h1>
          <p className={estilos.lead}>O endereço que você abriu não existe ou mudou de lugar.</p>
          <p className={estilos.centro}>
            <Link href="/">Voltar ao início</Link>
          </p>
        </section>
      )}
    </PortalShell>
  );
}
