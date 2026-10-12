import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Pagina, ParametrosLista } from '../../../../core/models/pagina.model';
import { LogAuditoria } from './auditoria.model';

@Injectable({ providedIn: 'root' })
export class AuditoriaApi {
  private readonly http = inject(HttpClient);

  listar(parametros: ParametrosLista): Observable<Pagina<LogAuditoria>> {
    let params = new HttpParams();
    Object.entries(parametros).forEach(([chave, valor]) => {
      if (valor !== null && valor !== undefined && valor !== '') {
        params = params.set(chave, String(valor));
      }
    });
    return this.http.get<Pagina<LogAuditoria>>(`${environment.apiUrl}/auditoria`, { params });
  }
}
