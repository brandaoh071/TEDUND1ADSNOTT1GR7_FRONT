import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Status } from '../models/dominio.model';
import {
  RelatorioColaborador,
  RelatorioDiscente,
  RelatorioDocentes,
  RelatorioEstrutura,
} from '../models/relatorio.model';

@Injectable({ providedIn: 'root' })
export class RelatorioApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/relatorios`;

  estrutura(): Observable<RelatorioEstrutura> {
    return this.http.post<RelatorioEstrutura>(`${this.url}/estrutura`, null);
  }

  docentes(status: Status | null): Observable<RelatorioDocentes> {
    const params = status ? new HttpParams().set('status', status) : undefined;
    return this.http.post<RelatorioDocentes>(`${this.url}/docentes`, null, { params });
  }

  colaborador(): Observable<RelatorioColaborador> {
    return this.http.post<RelatorioColaborador>(`${this.url}/colaborador`, null);
  }

  discente(): Observable<RelatorioDiscente> {
    return this.http.post<RelatorioDiscente>(`${this.url}/discente`, null);
  }
}
