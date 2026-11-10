/**
 * Prefixo do endereço onde o site está publicado.
 *
 * No GitHub Pages, sem domínio próprio o site fica em
 * `<conta>.github.io/<repositório>/` — um prefixo que o código não pode
 * ignorar: arquivos fixos (/partners/…, /lspk-symbol.svg) e redirecionamentos
 * escritos à mão precisam carregá-lo. Com domínio próprio o prefixo é vazio.
 *
 * O valor vem do workflow (`actions/configure-pages` informa o caminho certo
 * para cada caso) e é o mesmo usado em `basePath`, no next.config.ts.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/** Põe o prefixo em um caminho absoluto do site ("/partners/x.png"). */
export function comBase(caminho: string): string {
  return `${BASE_PATH}${caminho}`;
}

/** Tira o prefixo de um `location.pathname`, deixando só o caminho do site. */
export function semBase(pathname: string): string {
  if (BASE_PATH && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))) {
    return pathname.slice(BASE_PATH.length) || "/";
  }
  return pathname;
}
