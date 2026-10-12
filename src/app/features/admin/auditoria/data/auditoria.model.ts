export const ACOES_AUDITADAS = [
  'LOGIN',
  'LOGIN_FALHO',
  'CRIAR',
  'EDITAR',
  'INATIVAR',
  'REATIVAR',
  'VALIDAR_SOLICITACAO',
  'ENVIAR_SOLICITACAO',
  'EMITIR_RELATORIO',
];

export const ENTIDADES_AUDITADAS = ['Usuario', 'IES', 'CentroAcademico', 'Curso', 'Docente', 'Discente', 'Disciplina'];

export interface LogAuditoria {
  id: number;
  usuario: string;
  perfis: string;
  acao: string;
  entidade: string;
  idRegistro: number | null;
  detalhes: string | null;
  dataHora: string;
}
