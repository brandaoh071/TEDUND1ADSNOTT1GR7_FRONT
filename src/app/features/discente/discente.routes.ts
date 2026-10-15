import { Routes } from '@angular/router';

export default [
  { path: '', pathMatch: 'full', redirectTo: 'minhas-solicitacoes' },
  {
    path: 'nova-solicitacao',
    title: 'Nova solicitação · TED',
    loadComponent: () => import('./solicitacoes/pages/nova-solicitacao.page'),
  },
  {
    path: 'minhas-solicitacoes',
    title: 'Minhas solicitações · TED',
    loadComponent: () => import('./solicitacoes/pages/minhas-solicitacoes.page'),
  },
  {
    path: 'relatorio',
    title: 'Meu relatório · TED',
    loadComponent: () => import('./relatorio/pages/relatorio-discente.page'),
  },
] satisfies Routes;
