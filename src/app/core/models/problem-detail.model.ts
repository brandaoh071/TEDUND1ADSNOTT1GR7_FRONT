export interface ErroDeCampo {
  campo: string;
  mensagem: string;
}

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  errors?: ErroDeCampo[];
}
