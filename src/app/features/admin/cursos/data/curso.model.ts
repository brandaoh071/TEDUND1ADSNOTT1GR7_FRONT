import { Registro } from '../../../../core/models/dominio.model';

export type Turno = 'MATUTINO' | 'VESPERTINO' | 'NOTURNO' | 'INTEGRAL';

export const TURNOS: Turno[] = ['MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL'];

export interface Curso extends Registro {
  sigla: string;
  descricao: string;
  coordenador: string;
  turnos: Turno[];
  centroAcademicoId: number;
  centroAcademicoNome: string;
  iesId: number;
  iesSigla: string;
}

export interface CursoRequest {
  sigla: string;
  descricao: string;
  coordenador: string;
  centroAcademicoId: number | null;
  turnos: Turno[];
}
