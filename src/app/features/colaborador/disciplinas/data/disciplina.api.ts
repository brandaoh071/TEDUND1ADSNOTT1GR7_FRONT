import { Injectable } from '@angular/core';
import { CrudApi } from '../../../../core/data/crud.api';
import { Disciplina, DisciplinaRequest } from './disciplina.model';

@Injectable({ providedIn: 'root' })
export class DisciplinaApi extends CrudApi<Disciplina, DisciplinaRequest> {
  protected readonly recurso = 'disciplinas';
}
