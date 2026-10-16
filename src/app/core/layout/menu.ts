import { Perfil } from '../models/dominio.model';

export interface ItemMenu {
  rotulo: string;
  icone: string;
  rota: string;
}

export const MENU_POR_PERFIL: Record<Perfil, ItemMenu[]> = {
  ADMIN: [
    { rotulo: 'IES', icone: 'account_balance', rota: '/admin/ies' },
    { rotulo: 'Centros Acadêmicos', icone: 'apartment', rota: '/admin/centros-academicos' },
    { rotulo: 'Cursos', icone: 'school', rota: '/admin/cursos' },
    { rotulo: 'Docentes', icone: 'badge', rota: '/admin/docentes' },
    { rotulo: 'Auditoria', icone: 'policy', rota: '/admin/auditoria' },
    { rotulo: 'Relatórios', icone: 'summarize', rota: '/admin/relatorios' },
  ],
  COLABORADOR: [
    { rotulo: 'Disciplinas', icone: 'menu_book', rota: '/colaborador/disciplinas' },
    { rotulo: 'Discentes', icone: 'groups', rota: '/colaborador/discentes' },
    { rotulo: 'Validação de solicitações', icone: 'fact_check', rota: '/colaborador/validacao' },
    { rotulo: 'Meu relatório', icone: 'summarize', rota: '/colaborador/relatorio' },
  ],
  USUARIO: [
    { rotulo: 'Nova solicitação', icone: 'playlist_add', rota: '/discente/nova-solicitacao' },
    { rotulo: 'Minhas solicitações', icone: 'list_alt', rota: '/discente/minhas-solicitacoes' },
    { rotulo: 'Meu relatório', icone: 'summarize', rota: '/discente/relatorio' },
  ],
};

export function montarMenu(perfis: Perfil[]): { perfil: Perfil; itens: ItemMenu[] }[] {
  const secoes = perfis.map((perfil) => ({ perfil, itens: [...MENU_POR_PERFIL[perfil]] }));
  if (perfis.includes('ADMIN') && !perfis.includes('COLABORADOR')) {
    secoes.push({ perfil: 'COLABORADOR', itens: [...MENU_POR_PERFIL.COLABORADOR] });
  }
  return secoes;
}
