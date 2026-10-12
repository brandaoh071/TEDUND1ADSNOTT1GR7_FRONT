import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Opcao } from '../models/dominio.model';
import { Pagina } from '../models/pagina.model';

interface ItemComNome {
  id: number;
  sigla?: string;
  nome?: string;
  descricao?: string;
  nomeCompleto?: string;
  iesSigla?: string;
}

@Injectable({ providedIn: 'root' })
export class OpcoesApi {
  private readonly http = inject(HttpClient);

  ies(): Observable<Opcao[]> {
    return this.buscar('ies', 'sigla', (i) => `${i.sigla} - ${i.nome}`);
  }

  centrosAcademicos(iesId?: number | null): Observable<Opcao[]> {
    return this.buscar('centros-academicos', 'nome', (c) => `${c.nome} (${c.iesSigla})`, { iesId });
  }

  cursos(): Observable<Opcao[]> {
    return this.buscar('cursos', 'descricao', (c) => `${c.sigla} - ${c.descricao}`);
  }

  docentes(): Observable<Opcao[]> {
    return this.buscar('docentes', 'nomeCompleto', (d) => d.nomeCompleto ?? '');
  }

  private buscar(
    recurso: string,
    ordem: string,
    rotulo: (item: ItemComNome) => string,
    filtros: Record<string, number | null | undefined> = {},
  ): Observable<Opcao[]> {
    let params = new HttpParams().set('status', 'ATIVO').set('size', 1000).set('sort', ordem);
    Object.entries(filtros).forEach(([chave, valor]) => {
      if (valor !== null && valor !== undefined) {
        params = params.set(chave, valor);
      }
    });
    return this.http
      .get<Pagina<ItemComNome>>(`${environment.apiUrl}/${recurso}`, { params })
      .pipe(map((pagina) => pagina.conteudo.map((item) => ({ id: item.id, rotulo: rotulo(item) }))));
  }
}
