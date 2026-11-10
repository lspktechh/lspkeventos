import { Suspense } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import estilos from "@/components/portal/portal.module.css";
import { InscricaoRoteador } from "./InscricaoRoteador";

export default function PaginaDeInscricao() {
  return (
    <Suspense
      fallback={
        <PortalShell aba="inscricao">
          <p className={estilos.estado}>Carregando…</p>
        </PortalShell>
      }
    >
      <InscricaoRoteador />
    </Suspense>
  );
}
