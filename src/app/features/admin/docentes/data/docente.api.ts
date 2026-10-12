import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudApi } from '../../../../core/data/crud.api';
import { ItemHistorico } from '../../../../shared/components/historico-dialog.component';
import { Docente, DocenteRequest } from './docente.model';

@Injectable({ providedIn: 'root' })
export class DocenteApi extends CrudApi<Docente, DocenteRequest> {
  protected readonly recurso = 'docentes';

  historico(id: number): Observable<ItemHistorico[]> {
    return this.http.get<ItemHistorico[]>(`${this.url}/${id}/historico`);
  }
}
