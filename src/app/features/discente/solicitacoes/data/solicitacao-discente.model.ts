export interface SemestreDaSolicitacao {
  semestreReferencia: string;
  jaSolicitado: boolean;
}

export interface DisciplinaOfertada {
  id: number;
  sigla: string;
  descricao: string;
  cursoSigla: string;
  cargaHoraria: number;
  docenteNome: string;
}

export interface ItemEscolhido {
  disciplinaId: number;
  prioridade: number;
}

export interface NovaSolicitacao {
  itens: ItemEscolhido[];
}
