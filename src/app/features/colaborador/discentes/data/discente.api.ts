import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApi } from '../../../../core/data/crud.api';
import { ItemHistorico } from '../../../../shared/components/historico-dialog.component';
import { Discente, DiscenteRequest } from './discente.model';

@Injectable({ providedIn: 'root' })
export class DiscenteApi extends CrudApi<Discente, DiscenteRequest> {
  protected readonly recurso = 'discentes';

  historico(id: number): Observable<ItemHistorico[]> {
    return this.http.get<ItemHistorico[]>(`${this.url}/${id}/historico`);
  }
}
