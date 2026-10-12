import { Registro } from '../../../../core/models/dominio.model';

export const MOTIVOS_INATIVACAO_DISCENTE = ['AFASTAMENTO', 'DESLIGAMENTO', 'DESISTENCIA', 'OUTRO'];

export interface Discente extends Registro {
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cursoId: number;
  cursoSigla: string;
  cursoDescricao: string;
}

export interface DiscenteRequest {
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cursoId: number | null;
  senha: string | null;
}
