import { Routes } from '@angular/router';

export default [
  { path: '', pathMatch: 'full', redirectTo: 'disciplinas' },
  {
    path: 'validacao',
    title: 'Validação de solicitações · TED',
    loadComponent: () => import('./validacao/pages/validacao.page'),
  },
  {
    path: 'disciplinas',
    title: 'Disciplinas · TED',
    loadComponent: () => import('./disciplinas/pages/disciplina-lista.page'),
  },
  {
    path: 'disciplinas/nova',
    title: 'Nova disciplina · TED',
    loadComponent: () => import('./disciplinas/pages/disciplina-form.page'),
  },
  {
    path: 'disciplinas/:id',
    title: 'Editar disciplina · TED',
    loadComponent: () => import('./disciplinas/pages/disciplina-form.page'),
  },
  {
    path: 'discentes',
    title: 'Discentes · TED',
    loadComponent: () => import('./discentes/pages/discente-lista.page'),
  },
  {
    path: 'discentes/novo',
    title: 'Novo discente · TED',
    loadComponent: () => import('./discentes/pages/discente-form.page'),
  },
  {
    path: 'discentes/:id',
    title: 'Editar discente · TED',
    loadComponent: () => import('./discentes/pages/discente-form.page'),
  },
  {
    path: 'relatorio',
    title: 'Meu relatório · TED',
    loadComponent: () => import('./relatorio/pages/relatorio-colaborador.page'),
  },
] satisfies Routes;
