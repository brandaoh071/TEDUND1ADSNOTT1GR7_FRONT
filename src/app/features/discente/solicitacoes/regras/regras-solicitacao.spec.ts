import { verificarRegras } from './regras-solicitacao';

const itens = (quantidade: number, prioridade: number) =>
  Array.from({ length: quantidade }, (_, i) => ({ disciplinaId: i + 1, prioridade }));

describe('regras da solicitação', () => {
  it('aceita de 2 a 9 disciplinas', () => {
    expect(verificarRegras(itens(2, 1))).toEqual([]);
    expect(verificarRegras(itens(9, 1))).toEqual([]);
    expect(verificarRegras(itens(1, 1)).length).toBe(1);
    expect(verificarRegras(itens(10, 1)).length).toBe(1);
  });

  it('limita a 2 disciplinas com prioridade máxima', () => {
    expect(verificarRegras(itens(2, 5))).toEqual([]);
    expect(verificarRegras(itens(3, 5))[0]).toContain('prioridade 5');
  });
});
