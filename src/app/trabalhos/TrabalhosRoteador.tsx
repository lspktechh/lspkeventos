"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PortalShell } from "@/components/portal/PortalShell";
import estilos from "@/components/portal/portal.module.css";
import { TrabalhosCliente } from "./TrabalhosCliente";

/** O evento vem em `?e=<slug>` — ver InscricaoRoteador para o motivo. */
export function TrabalhosRoteador() {
  const slug = useSearchParams().get("e")?.trim() ?? "";
  if (!slug) {
    return (
      <PortalShell aba="acessar">
        <section className={estilos.secao}>
          <h1 className={estilos.titulo}>Evento não informado</h1>
          <p className={estilos.lead}>Abra o endereço de trabalhos que a organização divulgou.</p>
          <p className={estilos.centro}>
            <Link href="/">Voltar ao início</Link>
          </p>
        </section>
      </PortalShell>
    );
  }
  return <TrabalhosCliente slug={slug} />;
}
