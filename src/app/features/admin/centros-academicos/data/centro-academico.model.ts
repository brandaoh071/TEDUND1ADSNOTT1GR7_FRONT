import { Registro } from '../../../../core/models/dominio.model';

export interface CentroAcademico extends Registro {
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  coordenador: string;
  iesId: number;
  iesSigla: string;
}

export interface CentroAcademicoRequest {
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  coordenador: string;
  iesId: number | null;
}
