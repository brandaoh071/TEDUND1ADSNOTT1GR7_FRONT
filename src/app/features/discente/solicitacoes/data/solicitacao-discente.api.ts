import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Pagina } from '../../../../core/models/pagina.model';
import { Solicitacao } from '../../../../core/models/solicitacao.model';
import { DisciplinaOfertada, NovaSolicitacao, SemestreDaSolicitacao } from './solicitacao-discente.model';

@Injectable({ providedIn: 'root' })
export class SolicitacaoDiscenteApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/solicitacoes`;

  semestre(): Observable<SemestreDaSolicitacao> {
    return this.http.get<SemestreDaSolicitacao>(`${this.url}/semestre`);
  }

  disciplinasOfertadas(): Observable<Pagina<DisciplinaOfertada>> {
    const params = new HttpParams().set('status', 'ATIVO').set('size', 500).set('sort', 'sigla');
    return this.http.get<Pagina<DisciplinaOfertada>>(`${environment.apiUrl}/disciplinas`, { params });
  }

  enviar(solicitacao: NovaSolicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.url, solicitacao);
  }

  minhas(page: number, size: number): Observable<Pagina<Solicitacao>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Pagina<Solicitacao>>(`${this.url}/minhas`, { params });
  }
}
