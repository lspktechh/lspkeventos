"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buscarEventosAbertos, type EventoAberto } from "@/lib/eventosAbertos";
import { PortalShell } from "@/components/portal/PortalShell";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@/components/Icons";
import estilos from "@/components/portal/portal.module.css";

function formatarData(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

function formatarHorario(inicioIso?: string, fimIso?: string) {
  if (!inicioIso) return null;
  const inicio = new Date(inicioIso);
  if (isNaN(inicio.getTime())) return null;
  const inicioStr = inicio.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
  if (!fimIso) return inicioStr;
  const fim = new Date(fimIso);
  if (isNaN(fim.getTime())) return inicioStr;
  const fimStr = fim.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
  return fimStr && fimStr !== inicioStr ? `${inicioStr} às ${fimStr}` : inicioStr;
}

export default function InscricaoIndice() {
  const [abertos, setAbertos] = useState<EventoAberto[] | null>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    buscarEventosAbertos()
      .then((lista) => {
        setAbertos(lista);
      })
      .catch(() => setFalhou(true));
  }, []);

  return (
    <PortalShell aba="inscricao" larga>
      <section className={estilos.secao}>
        <div className={estilos.cabecaSecao}>
          <span className={estilos.rotuloMono}>Inscrições</span>
          <h1 className={estilos.titulo}>Inscrições Abertas</h1>
          <p className={estilos.lead}>
            Selecione um evento abaixo para conferir as informações e garantir sua vaga.
          </p>
        </div>

        {falhou ? (
          <div className={estilos.estado} role="alert">
            <p style={{ margin: "0 0 12px", color: "#fca5a5", fontWeight: 500 }}>
              Não foi possível carregar a lista de eventos no momento.
            </p>
            <button
              type="button"
              onClick={() => {
                setFalhou(false);
                setAbertos(null);
                buscarEventosAbertos().then(setAbertos).catch(() => setFalhou(true));
              }}
              className={estilos.acao}
            >
              Tentar novamente
            </button>
          </div>
        ) : abertos === null ? (
          <div className={estilos.estado}>
            <p style={{ margin: 0 }}>Carregando eventos disponíveis…</p>
          </div>
        ) : abertos.length === 0 ? (
          <div className={estilos.cartaoModerno} style={{ textAlign: "center", padding: "40px 24px" }}>
            <h2 style={{ fontSize: "18px", margin: "0 0 8px", color: "var(--tinta)" }}>
              Nenhuma inscrição aberta no momento
            </h2>
            <p className={estilos.lead} style={{ margin: "0 0 24px" }}>
              Novos eventos serão anunciados em breve. Se você já realizou sua inscrição anteriormente, acesse sua credencial com seu e-mail cadastrado.
            </p>
            <Link href="/" className={estilos.botao} style={{ display: "inline-flex", textDecoration: "none", width: "auto", padding: "0 28px" }}>
              Acessar meu QR Code
            </Link>
          </div>
        ) : (
          <div className={estilos.gradeEventos}>
            {abertos.map((e) => {
              const dataTxt = formatarData(e.startDate);
              const horaTxt = formatarHorario(e.startDate, e.endDate);

              return (
                <article key={e.slug} className={estilos.cartaoEvento}>
                  {e.bannerUrl && (
                    <div className={estilos.bannerCard}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={e.bannerUrl} alt={e.name} />
                    </div>
                  )}

                  <div className={estilos.corpoCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className={estilos.badgeAberto}>
                        <span className={estilos.pontoAberto}></span> Inscrições Abertas
                      </span>
                    </div>

                    <h2 className={estilos.tituloCard}>{e.name}</h2>

                    <div className={estilos.chipsContainer}>
                      {dataTxt && (
                        <span className={estilos.chip} title="Data do evento">
                          <CalendarIcon size={14} color="#3b5bff" />
                          {dataTxt}
                        </span>
                      )}
                      {horaTxt && (
                        <span className={estilos.chip} title="Horário">
                          <ClockIcon size={14} color="#3b5bff" />
                          {horaTxt}
                        </span>
                      )}
                      {e.location && (
                        <span className={estilos.chip} title="Local">
                          <MapPinIcon size={14} color="#3b5bff" />
                          {e.location}
                        </span>
                      )}
                    </div>

                    {e.description && (
                      <p className={estilos.descricaoCard}>{e.description}</p>
                    )}

                    <Link
                      href={`/inscricao/?e=${encodeURIComponent(e.slug)}`}
                      className={estilos.botaoCard}
                    >
                      Realizar inscrição →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </PortalShell>
  );
}
