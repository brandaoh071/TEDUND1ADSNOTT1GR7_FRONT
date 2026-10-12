import { Registro } from '../../../../core/models/dominio.model';

export interface ProReitoria {
  nome: string;
  nomeado: string;
}

export interface Ies extends Registro {
  sigla: string;
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  reitor: string;
  proReitorias: ProReitoria[];
}

export interface IesRequest {
  sigla: string;
  nome: string;
  emailCentral: string;
  telefoneCentral: string;
  reitor: string;
  proReitorias: ProReitoria[];
}
