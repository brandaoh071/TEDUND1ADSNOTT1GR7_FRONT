import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { perfilGuard } from './core/guards/perfil.guard';

export const routes: Routes = [
  { path: 'login', title: 'Entrar · TED', loadComponent: () => import('./features/auth/login.page') },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/shell.component'),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', title: 'Início · TED', loadComponent: () => import('./features/inicio/inicio.page') },
      {
        path: 'admin',
        canMatch: [perfilGuard('ADMIN')],
        loadChildren: () => import('./features/admin/admin.routes'),
      },
      {
        path: 'colaborador',
        canMatch: [perfilGuard('COLABORADOR', 'ADMIN')],
        loadChildren: () => import('./features/colaborador/colaborador.routes'),
      },
      {
        path: 'discente',
        canMatch: [perfilGuard('USUARIO')],
        loadChildren: () => import('./features/discente/discente.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
