import { montarMenu } from './menu';

describe('montarMenu', () => {
  it('administrador também vê as telas do colaborador', () => {
    const secoes = montarMenu(['ADMIN']);
    expect(secoes.map((s) => s.perfil)).toEqual(['ADMIN', 'COLABORADOR']);
  });

  it('discente vê apenas a própria área', () => {
    const rotas = montarMenu(['USUARIO']).flatMap((s) => s.itens.map((i) => i.rota));
    expect(rotas).toEqual(['/discente/nova-solicitacao', '/discente/minhas-solicitacoes']);
  });

  it('perfis acumulados somam os menus', () => {
    expect(montarMenu(['COLABORADOR', 'USUARIO']).length).toBe(2);
  });
});
