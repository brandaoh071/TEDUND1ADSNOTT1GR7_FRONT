import { Injectable } from '@angular/core';
import { CrudApi } from '../../../../core/data/crud.api';
import { CentroAcademico, CentroAcademicoRequest } from './centro-academico.model';

@Injectable({ providedIn: 'root' })
export class CentroAcademicoApi extends CrudApi<CentroAcademico, CentroAcademicoRequest> {
  protected readonly recurso = 'centros-academicos';
}
