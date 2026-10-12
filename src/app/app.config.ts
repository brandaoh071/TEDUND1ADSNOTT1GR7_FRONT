import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { PaginadorIntl } from './shared/components/paginador-intl';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MM/yyyy HH:mm', timezone: '-0300' } },
    { provide: MatPaginatorIntl, useClass: PaginadorIntl },
  ],
};
