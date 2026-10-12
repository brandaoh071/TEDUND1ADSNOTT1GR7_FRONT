import { Registro } from '../../../../core/models/dominio.model';

export interface Disciplina extends Registro {
  sigla: string;
  descricao: string;
  cursoId: number;
  cursoSigla: string;
  cursoDescricao: string;
  cargaHoraria: number;
  docenteId: number;
  docenteNome: string;
}

export interface DisciplinaRequest {
  sigla: string;
  descricao: string;
  cursoId: number | null;
  cargaHoraria: number | null;
  docenteId: number | null;
}
