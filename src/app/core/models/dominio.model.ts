export type Perfil = 'ADMIN' | 'COLABORADOR' | 'USUARIO';

export type Status = 'ATIVO' | 'INATIVO';

export interface Registro {
  id: number;
  status: Status;
  dataCadastro: string;
}

export interface Opcao {
  id: number;
  rotulo: string;
}
