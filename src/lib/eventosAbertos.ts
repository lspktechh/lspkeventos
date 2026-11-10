import { API_URL } from "./backend";

export interface EventoAberto {
  slug: string;
  name: string;
  description?: string | null;
  location?: string | null;
  startDate?: string;
  endDate?: string;
  bannerUrl?: string | null;
}

/**
 * Eventos com inscrição aberta, buscados do servidor.
 *
 * Buscados, e não cravados no código: um evento novo aparece sozinho.
 * O COPOL fica de fora porque tem site e inscrição próprios.
 */
function slugificar(nome: string): string {
  return (
    nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || "evento"
  );
}

export async function buscarEventosAbertos(): Promise<EventoAberto[]> {
  try {
    const r = await fetch(`${API_URL}/public/events/open-registration`);
    if (!r.ok) return [];
    const corpo = await r.json();
    const lista: any[] = Array.isArray(corpo?.data) ? corpo.data : [];
    return lista
      .filter((e) => {
        const slug = (e.slug || slugificar(e.name || "")).toLowerCase();
        const nome = (e.name || "").toLowerCase();
        return !slug.includes("copol") && !nome.includes("copol");
      })
      .map((e) => ({
        slug: e.slug || slugificar(e.name || ""),
        name: e.name,
        description: e.description || null,
        location: e.location || null,
        startDate: e.startDate,
        endDate: e.endDate,
        bannerUrl: e.bannerUrl || null,
      }));
  } catch {
    return [];
  }
}
