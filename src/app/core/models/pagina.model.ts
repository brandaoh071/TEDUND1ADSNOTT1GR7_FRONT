export interface Pagina<T> {
  conteudo: T[];
  pagina: number;
  tamanho: number;
  totalElementos: number;
  totalPaginas: number;
}

export interface ParametrosLista {
  page: number;
  size: number;
  sort?: string;
  [filtro: string]: string | number | boolean | null | undefined;
}
