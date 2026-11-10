import { Suspense } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import estilos from "@/components/portal/portal.module.css";
import { TrabalhosRoteador } from "./TrabalhosRoteador";

export default function PaginaTrabalhos() {
  return (
    <Suspense
      fallback={
        <PortalShell aba="acessar">
          <p className={estilos.estado}>Carregando…</p>
        </PortalShell>
      }
    >
      <TrabalhosRoteador />
    </Suspense>
  );
}
