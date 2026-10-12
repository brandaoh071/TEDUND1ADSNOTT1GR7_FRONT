import { Routes } from '@angular/router';

export default [
  { path: '', pathMatch: 'full', redirectTo: 'ies' },
  { path: 'ies', title: 'IES · TED', loadComponent: () => import('./ies/pages/ies-lista.page') },
  { path: 'ies/nova', title: 'Nova IES · TED', loadComponent: () => import('./ies/pages/ies-form.page') },
  { path: 'ies/:id', title: 'Editar IES · TED', loadComponent: () => import('./ies/pages/ies-form.page') },
  {
    path: 'centros-academicos',
    title: 'Centros Acadêmicos · TED',
    loadComponent: () => import('./centros-academicos/pages/centro-academico-lista.page'),
  },
  {
    path: 'centros-academicos/novo',
    title: 'Novo centro acadêmico · TED',
    loadComponent: () => import('./centros-academicos/pages/centro-academico-form.page'),
  },
  {
    path: 'centros-academicos/:id',
    title: 'Editar centro acadêmico · TED',
    loadComponent: () => import('./centros-academicos/pages/centro-academico-form.page'),
  },
  { path: 'cursos', title: 'Cursos · TED', loadComponent: () => import('./cursos/pages/curso-lista.page') },
  { path: 'cursos/novo', title: 'Novo curso · TED', loadComponent: () => import('./cursos/pages/curso-form.page') },
  { path: 'cursos/:id', title: 'Editar curso · TED', loadComponent: () => import('./cursos/pages/curso-form.page') },
  { path: 'docentes', title: 'Docentes · TED', loadComponent: () => import('./docentes/pages/docente-lista.page') },
  {
    path: 'docentes/novo',
    title: 'Novo docente · TED',
    loadComponent: () => import('./docentes/pages/docente-form.page'),
  },
  {
    path: 'docentes/:id',
    title: 'Editar docente · TED',
    loadComponent: () => import('./docentes/pages/docente-form.page'),
  },
  { path: 'auditoria', title: 'Auditoria · TED', loadComponent: () => import('./auditoria/pages/auditoria.page') },
] satisfies Routes;
