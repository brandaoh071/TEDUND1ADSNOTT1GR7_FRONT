import { Registro } from '../../../../core/models/dominio.model';

export const MOTIVOS_INATIVACAO_DOCENTE = ['AFASTAMENTO', 'DESLIGAMENTO', 'SUSPENSAO_CONTRATUAL', 'OUTRO'];

export interface Docente extends Registro {
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  centroAcademicoId: number;
  centroAcademicoNome: string;
  iesSigla: string;
}

export interface DocenteRequest {
  matricula: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  centroAcademicoId: number | null;
  senha: string | null;
}
