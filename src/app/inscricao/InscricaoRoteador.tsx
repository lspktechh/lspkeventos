"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import estilos from "@/components/portal/portal.module.css";
import { InscricaoCliente } from "./InscricaoCliente";
import InscricaoIndice from "./InscricaoIndice";

/**
 * Decide o que a aba "Inscrição" mostra.
 *
 * Com `?e=<slug>`, o formulário daquele evento; sem, o índice (que vai
 * direto ao evento quando há um só aberto). O evento vem por query string
 * porque a exportação estática não tem como gerar uma página por evento
 * que ainda nem foi criado no momento do build.
 */
export function InscricaoRoteador() {
  const slug = useSearchParams().get("e")?.trim() ?? "";
  // O COPOL tem site e inscrição próprios.
  const copol = slug.toLowerCase().includes("copol");

  useEffect(() => {
    if (copol) window.location.replace("https://copol2026.com.br");
  }, [copol]);

  if (copol) {
    return (
      <PortalShell aba="inscricao">
        <p className={estilos.estado}>Redirecionando…</p>
      </PortalShell>
    );
  }
  if (slug) return <InscricaoCliente slug={slug} />;
  return <InscricaoIndice />;
}
