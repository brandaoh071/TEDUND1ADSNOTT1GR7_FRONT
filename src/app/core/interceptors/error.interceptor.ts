import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ProblemDetail } from '../models/problem-detail.model';
import { NotificacaoService } from '../notificacao/notificacao.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const notificacao = inject(NotificacaoService);

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      const problema = (erro.error ?? {}) as ProblemDetail;
      const ehLogin = req.url.endsWith('/auth/login');

      if (erro.status === 0) {
        notificacao.erro('Não foi possível conectar à API. Verifique se o Back-End está em execução.');
      } else if (erro.status === 401 && !ehLogin) {
        notificacao.erro('Sua sessão expirou. Entre novamente.');
        auth.sair();
      } else if (erro.status === 403) {
        notificacao.erro(problema.detail ?? 'Seu perfil não tem permissão para esta ação.');
      } else {
        notificacao.erro(problema.detail ?? 'Ocorreu um erro inesperado.');
      }
      return throwError(() => erro);
    }),
  );
};
