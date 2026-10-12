import { Injectable } from '@angular/core';
import { CrudApi } from '../../../../core/data/crud.api';
import { Curso, CursoRequest } from './curso.model';

@Injectable({ providedIn: 'root' })
export class CursoApi extends CrudApi<Curso, CursoRequest> {
  protected readonly recurso = 'cursos';
}
