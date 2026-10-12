import { ItemEscolhido } from '../data/solicitacao-discente.model';

export const MINIMO_DISCIPLINAS = 2;
export const MAXIMO_DISCIPLINAS = 9;
export const PRIORIDADE_MAXIMA = 5;
export const LIMITE_PRIORIDADE_MAXIMA = 2;
export const PRIORIDADES = [1, 2, 3, 4, 5];

export type RegraSolicitacao = (itens: ItemEscolhido[]) => string | null;

export const quantidadeDeDisciplinas: RegraSolicitacao = (itens) =>
  itens.length < MINIMO_DISCIPLINAS || itens.length > MAXIMO_DISCIPLINAS
    ? `Escolha de ${MINIMO_DISCIPLINAS} a ${MAXIMO_DISCIPLINAS} disciplinas (selecionadas: ${itens.length})`
    : null;

export const limiteDePrioridadeMaxima: RegraSolicitacao = (itens) => {
  const maximas = itens.filter((item) => item.prioridade === PRIORIDADE_MAXIMA).length;
  return maximas > LIMITE_PRIORIDADE_MAXIMA
    ? `Apenas ${LIMITE_PRIORIDADE_MAXIMA} disciplinas podem ter prioridade ${PRIORIDADE_MAXIMA} (marcadas: ${maximas})`
    : null;
};

export const REGRAS_SOLICITACAO: RegraSolicitacao[] = [quantidadeDeDisciplinas, limiteDePrioridadeMaxima];

export function verificarRegras(itens: ItemEscolhido[]): string[] {
  return REGRAS_SOLICITACAO.map((regra) => regra(itens)).filter((mensagem): mensagem is string => mensagem !== null);
}
