import { Perfil, Status } from './dominio.model';

export type TipoRelatorio =
  'ESTRUTURA_ACADEMICA' | 'DOCENTES' | 'COLABORADOR_COMPLETO' | 'DISCENTE_COMPLETO';

export interface Emissao {
  id: number;
  tipo: TipoRelatorio;
  titulo: string;
  emitidoPor: string;
  nomeEmissor: string;
  perfilEmissor: Perfil;
  dataEmissao: string;
  filtroStatus: Status | null;
}

export interface PessoaDoRelatorio {
  id: number;
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  vinculo: string;
  dataCadastro: string;
  status: Status;
}

export interface CursoFicha {
  id: number;
  sigla: string;
  descricao: string;
  coordenador: string;
  turnos: string[];
  dataCadastro: string;
  status: Status;
}

export interface CentroAcademicoFicha {
  id: number;
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  coordenador: string;
  dataCadastro: string;
  status: Status;
  cursos: CursoFicha[];
}

export interface IesFicha {
  id: number;
  sigla: string;
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  reitor: string;
  proReitorias: { nome: string; nomeado: string }[];
  dataCadastro: string;
  status: Status;
  centrosAcademicos: CentroAcademicoFicha[];
}

export interface DocentesDoCentro {
  centroAcademicoId: number;
  centroAcademico: string;
  iesSigla: string | null;
  ativos: PessoaDoRelatorio[];
  inativos: PessoaDoRelatorio[];
}

export interface DisciplinaDoRelatorio {
  id: number;
  sigla: string;
  descricao: string;
  curso: string;
  cargaHoraria: number;
  dataCadastro: string;
  status: Status;
}

export interface SolicitacaoDoRelatorio {
  id: number;
  discenteMatricula: string | null;
  discenteNome: string | null;
  semestreReferencia: string;
  dataSolicitacao: string;
  status: string;
  validadoPor: string | null;
  dataValidacao: string | null;
  observacao: string | null;
  itens: {
    sigla: string | null;
    descricao: string | null;
    cargaHoraria: number | null;
    prioridade: number;
  }[];
}

export interface RelatorioEstrutura {
  emissao: Emissao;
  instituicoes: IesFicha[];
}

export interface RelatorioDocentes {
  emissao: Emissao;
  centrosAcademicos: DocentesDoCentro[];
  totalAtivos: number;
  totalInativos: number;
}

export interface RelatorioColaborador {
  emissao: Emissao;
  docente: PessoaDoRelatorio | null;
  disciplinas: DisciplinaDoRelatorio[];
  discentes: PessoaDoRelatorio[];
  solicitacoesValidadas: SolicitacaoDoRelatorio[];
}

export interface RelatorioDiscente {
  emissao: Emissao;
  discente: PessoaDoRelatorio;
  solicitacoes: SolicitacaoDoRelatorio[];
}
