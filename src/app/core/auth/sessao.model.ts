import { Perfil } from '../models/dominio.model';

export interface Sessao {
  token: string;
  login: string;
  perfis: Perfil[];
  expiraEm: string;
}

export interface Credenciais {
  login: string;
  senha: string;
}
