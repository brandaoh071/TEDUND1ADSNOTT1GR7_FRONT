export type StatusSolicitacao = 'AGUARDANDO' | 'EM_ANALISE' | 'LISTA_ESPERA';

export interface ItemSolicitacao {
  disciplinaId: number;
  sigla: string;
  descricao: string;
  cargaHoraria: number;
  prioridade: number;
}

export interface Solicitacao {
  id: number;
  discenteId: number;
  discenteMatricula: string;
  discenteNome: string;
  cursoId: number;
  cursoSigla: string;
  semestreReferencia: string;
  dataSolicitacao: string;
  status: StatusSolicitacao;
  itens: ItemSolicitacao[];
  validadoPor: string | null;
  dataValidacao: string | null;
  observacao: string | null;
  proximaDaFila: boolean;
}
