import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagina, ParametrosLista } from '../models/pagina.model';

export abstract class CrudApi<T, R> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly recurso: string;

  protected get url(): string {
    return `${environment.apiUrl}/${this.recurso}`;
  }

  listar(parametros: ParametrosLista): Observable<Pagina<T>> {
    return this.http.get<Pagina<T>>(this.url, { params: this.paraParams(parametros) });
  }

  buscar(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  cadastrar(dados: R): Observable<T> {
    return this.http.post<T>(this.url, dados);
  }

  editar(id: number, dados: R): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, dados);
  }

  inativar(id: number, corpo: unknown = null): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}/inativar`, corpo);
  }

  reativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}/reativar`, null);
  }

  protected paraParams(parametros: ParametrosLista): HttpParams {
    let params = new HttpParams();
    Object.entries(parametros).forEach(([chave, valor]) => {
      if (valor !== null && valor !== undefined && valor !== '') {
        params = params.set(chave, String(valor));
      }
    });
    return params;
  }
}
