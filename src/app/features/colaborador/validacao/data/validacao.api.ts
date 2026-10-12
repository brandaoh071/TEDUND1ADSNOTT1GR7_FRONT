import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Pagina } from '../../../../core/models/pagina.model';
import { Solicitacao, StatusSolicitacao } from '../../../../core/models/solicitacao.model';

@Injectable({ providedIn: 'root' })
export class ValidacaoApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/solicitacoes`;

  fila(status: StatusSolicitacao, page: number, size: number): Observable<Pagina<Solicitacao>> {
    const params = new HttpParams().set('status', status).set('page', page).set('size', size);
    return this.http.get<Pagina<Solicitacao>>(this.url, { params });
  }

  aprovar(id: number): Observable<Solicitacao> {
    return this.http.patch<Solicitacao>(`${this.url}/${id}/aprovar`, null);
  }

  enviarParaListaDeEspera(id: number, observacao: string | null): Observable<Solicitacao> {
    return this.http.patch<Solicitacao>(`${this.url}/${id}/lista-espera`, { observacao });
  }
}
