import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Perfil } from '../models/dominio.model';

export const perfilGuard =
  (...perfis: Perfil[]): CanMatchFn =>
  () =>
    inject(AuthService).possuiAlgum(perfis) ? true : inject(Router).createUrlTree(['/']);
