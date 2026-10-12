import { Injectable } from '@angular/core';
import { CrudApi } from '../../../../core/data/crud.api';
import { Ies, IesRequest } from './ies.model';

@Injectable({ providedIn: 'root' })
export class IesApi extends CrudApi<Ies, IesRequest> {
  protected readonly recurso = 'ies';
}
